import pygame
import time
import random

pygame.init()

white = (255, 255, 255)
yellow = (255, 255, 102)
black = (0, 0, 0)
red = (213, 50, 80)
green = (0, 255, 0)
blue = (50, 153, 213)
orange = (255, 165, 0)

dis_width = 800
dis_height = 600

dis = pygame.display.set_mode((dis_width, dis_height))
pygame.display.set_caption('Snake Game')

clock = pygame.time.Clock()

snake_block = 20
snake_speed = 200

font_style = pygame.font.SysFont("bahnschrift", 25)
score_font = pygame.font.SysFont("comicsansms", 35)

def Your_score(score, high_score):
    value = score_font.render("Score: " + str(score), True, yellow)
    dis.blit(value, [10, 10])
    high_value = score_font.render("High Score: " + str(high_score), True, yellow)
    dis.blit(high_value, [10, 50])

def our_snake(snake_block, snake_list):
    for i, x in enumerate(snake_list):
        color = black if i == len(snake_list) - 1 else green
        pygame.draw.rect(dis, color, [x[0], x[1], snake_block, snake_block])

def message(msg, color):
    mesg = font_style.render(msg, True, color)
    dis.blit(mesg, [dis_width / 6, dis_height / 3])

def generate_obstacles():
    obstacles = []
    for _ in range(5):
        obstacle_x = round(random.randrange(0, dis_width - snake_block) / 20.0) * 20.0
        obstacle_y = round(random.randrange(0, dis_height - snake_block) / 20.0) * 20.0
        obstacles.append((obstacle_x, obstacle_y))
    return obstacles

def gameLoop():
    game_over = False
    game_close = False

    x1 = dis_width / 2
    y1 = dis_height / 2

    x1_change = 0
    y1_change = 0

    snake_List = []
    Length_of_snake = 1

    foodx = round(random.randrange(0, dis_width - snake_block) / 20.0) * 20.0
    foody = round(random.randrange(0, dis_height - snake_block) / 20.0) * 20.0

    special_foodx = round(random.randrange(0, dis_width - snake_block) / 20.0) * 20.0
    special_foody = round(random.randrange(0, dis_height - snake_block) / 20.0) * 20.0
    special_food_active = False

    obstacles = generate_obstacles()

    score = 0
    high_score = 0

    def is_safe(new_x, new_y, snake_list, obstacles):
        if new_x < 0 or new_x >= dis_width or new_y < 0 or new_y >= dis_height:
            return False
        for obstacle in obstacles:
            if new_x == obstacle[0] and new_y == obstacle[1]:
                return False
        for segment in snake_list[:-1]:
            if new_x == segment[0] and new_y == segment[1]:
                return False
        return True

    while not game_over:
        while game_close:
            dis.fill(blue)
            message("You Lost! Press Q-Quit or C-Play Again", red)
            Your_score(score, high_score)
            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_q:
                        game_over = True
                        game_close = False
                    if event.key == pygame.K_c:
                        gameLoop()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True

        current_dx = x1_change
        current_dy = y1_change
        opposite_direction = (-current_dx, -current_dy)

        possible_directions = []
        for dx, dy in [(snake_block, 0), (-snake_block, 0), (0, snake_block), (0, -snake_block)]:
            if (dx, dy) != opposite_direction:
                possible_directions.append((dx, dy))

        safe_directions = []
        for dx, dy in possible_directions:
            new_x = x1 + dx
            new_y = y1 + dy
            if is_safe(new_x, new_y, snake_List, obstacles):
                safe_directions.append((dx, dy))

        targets = []
        if special_food_active:
            targets.append((special_foodx, special_foody))
        targets.append((foodx, foody))

        if safe_directions:
            best_dir = None
            min_dist = float('inf')
            for dx, dy in safe_directions:
                nx = x1 + dx
                ny = y1 + dy
                for target_x, target_y in targets:
                    distance = abs(nx - target_x) + abs(ny - target_y)
                    if distance < min_dist:
                        min_dist = distance
                        best_dir = (dx, dy)
            if best_dir:
                x1_change, y1_change = best_dir
        else:
            pass

        x1 += x1_change
        y1 += y1_change
        dis.fill(blue)

        for obstacle in obstacles:
            pygame.draw.rect(dis, orange, [obstacle[0], obstacle[1], snake_block, snake_block])

        pygame.draw.rect(dis, green, [foodx, foody, snake_block, snake_block])

        if special_food_active:
            pygame.draw.rect(dis, red, [special_foodx, special_foody, snake_block, snake_block])

        snake_Head = [x1, y1]
        snake_List.append(snake_Head)
        if len(snake_List) > Length_of_snake:
            del snake_List[0]

        for x in snake_List[:-1]:
            if x == snake_Head:
                game_close = True

        for obstacle in obstacles:
            if x1 == obstacle[0] and y1 == obstacle[1]:
                game_close = True

        our_snake(snake_block, snake_List)
        Your_score(score, high_score)

        pygame.display.update()
        if x1 == foodx and y1 == foody:
            foodx = round(random.randrange(0, dis_width - snake_block) / 20.0) * 20.0
            foody = round(random.randrange(0, dis_height - snake_block) / 20.0) * 20.0
            Length_of_snake += 1
            score += 1
            if score > high_score:
                high_score = score

            # Activate special food randomly
            if random.randint(1, 10) == 1:
                special_food_active = True
                special_foodx = round(random.randrange(0, dis_width - snake_block) / 20.0) * 20.0
                special_foody = round(random.randrange(0, dis_height - snake_block) / 20.0) * 20.0

        # Check if snake eats special food
        if special_food_active and x1 == special_foodx and y1 == special_foody:
            special_food_active = False
            Length_of_snake += 2
            score += 3
            if score > high_score:
                high_score = score

        clock.tick(snake_speed)

    pygame.quit()
    quit()

# Start the game
gameLoop()