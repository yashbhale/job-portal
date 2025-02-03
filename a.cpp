#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void generateMatrix(int n, int matrix[n][n]) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            matrix[i][j] = rand() % 100; 
        }
    }
}

void multiplyMatrices(int n, int matrixA[n][n], int matrixB[n][n], int result[n][n]) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            result[i][j] = 0;
            for (int k = 0; k < n; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }
}

int main() {
    int sizes[] = {5, 10, 50, 100, 150, 200};
    int numSizes = sizeof(sizes) / sizeof(sizes[0]);

    srand(time(NULL));

    for (int i = 0; i < numSizes; i++) {
        int n = sizes[i];
        printf("Matrix size: %dx%d\n", n, n);

        
        int matrixA[n][n], matrixB[n][n], result[n][n];

        
        generateMatrix(n, matrixA);
        generateMatrix(n, matrixB);

        
        clock_t start = clock();
        multiplyMatrices(n, matrixA, matrixB, result);
        clock_t end = clock();

        double executionTime = ((double)(end - start) / CLOCKS_PER_SEC) * 1000.0; 
        printf("Execution time: %.2f ms\n\n", executionTime);
    }

    return 0;
}