import pygame
import math

# Initialize Pygame
pygame.init()

# Set up the display
width, height = 600, 600
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Bouncing Ball in Rotating Square")

# Define colors
white = (255, 255, 255)
yellow = (255, 255, 0)
black = (0, 0, 0)

# Square parameters
square_size = 400
square_half = square_size // 2
square_pos = (width // 2, height // 2)

# Ball parameters
ball_radius = 20
ball_color = yellow
ball_pos = [square_pos[0], square_pos[1]]
ball_velocity = [5, 5]

# Rotation parameters
rotation_angle = 0
rotation_speed = 0.5  # Degrees per frame

# Game loop control
clock = pygame.time.Clock()
fps = 60

def calculate_rotated_corners(angle):
    """Calculate rotated square corners based on current angle"""
    angle_rad = math.radians(angle)
    cos_theta = math.cos(angle_rad)
    sin_theta = math.sin(angle_rad)

    # Original corners relative to center
    corners = [
        (-square_half, -square_half),
        (square_half, -square_half),
        (square_half, square_half),
        (-square_half, square_half)
    ]

    # Rotate and translate corners
    rotated = []
    for x, y in corners:
        x_rot = x * cos_theta - y * sin_theta + square_pos[0]
        y_rot = x * sin_theta + y * cos_theta + square_pos[1]
        rotated.append((x_rot, y_rot))
    return rotated

def handle_collisions(corners):
    """Handle collisions with all four walls of the square"""
    global ball_velocity, ball_pos

    for i in range(4):
        # Get two consecutive points forming a wall
        x1, y1 = corners[i]
        x2, y2 = corners[(i+1)%4]

        # Calculate line equation coefficients (Ax + By + C = 0)
        A = y2 - y1
        B = x1 - x2
        C = x2*y1 - x1*y2

        denominator = math.sqrt(A**2 + B**2)
        if denominator == 0:
            continue

        # Calculate signed distance from ball to wall
        distance = (A * ball_pos[0] + B * ball_pos[1] + C) / denominator

        # Only check collisions when moving outward (distance > 0)
        if 0 < distance < ball_radius:
            # Normalize normal vector
            normal = (A / denominator, B / denominator)

            # Calculate velocity dot normal
            vel_dot_normal = ball_velocity[0] * normal[0] + ball_velocity[1] * normal[1]

            # Only respond if moving towards the wall
            if vel_dot_normal > 0:
                # Reflect velocity vector
                ball_velocity[0] -= 2 * vel_dot_normal * normal[0]
                ball_velocity[1] -= 2 * vel_dot_normal * normal[1]

                # Adjust position to prevent sticking and ensure valid numbers
                overlap = ball_radius - distance
                ball_pos[0] = float(ball_pos[0] - overlap * normal[0])
                ball_pos[1] = float(ball_pos[1] - overlap * normal[1])

# Main game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill(black)

    # Update rotation angle
    rotation_angle = (rotation_angle + rotation_speed) % 360

    # Calculate rotated corners
    rotated_corners = calculate_rotated_corners(rotation_angle)

    # Update ball position
    ball_pos[0] += ball_velocity[0]
    ball_pos[1] += ball_velocity[1]

    # Handle collisions
    handle_collisions(rotated_corners)

    # Draw the square
    pygame.draw.polygon(screen, white, rotated_corners, 2)

    # Draw the ball
    pygame.draw.circle(screen, ball_color, (int(ball_pos[0]), int(ball_pos[1])), ball_radius)

    pygame.display.flip()
    clock.tick(fps)

pygame.quit()