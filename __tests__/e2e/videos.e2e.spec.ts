import app from "../../src/app";


const request = require('supertest');

describe('API Tests for /hometask_01/api/videos', () => {

    // Очищаем "базу данных"
    beforeEach(async () => {
        await request(app).delete('/hometask_01/api/testing/all-data')
    // .expect(204);
    });

    const createdAt = new Date(); // Или получается из тела запроса
    const publicationDate = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
    // Объект с валидными данными
    const validVideoData = {
        title: 'Как приготовить чай',
        author: 'Иван Иванов',
        availableResolutions: ['P720', 'P1080'],
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
    };

    // --- БЛОК ТЕСТОВ (POST)
    describe('POST /hometask_01/api/videos - Create Video', () => {

        it('should create a video with valid data and return status 201', async () => {
            const response = await request(app)
                .post('/hometask_01/api/videos')
                .send(validVideoData)
                //.expect(201); // Ждем статус 201 Created

            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe(validVideoData.title);
            expect(response.body.author).toBe(validVideoData.author);
            expect(response.body.availableResolutions).toEqual(
                expect.arrayContaining(validVideoData.availableResolutions)
            );
        });

        it('should return 400 Bad Request if required fields are missing or empty', async () => {
            const invalidData = { ...validVideoData, title: '' };

            const response = await request(app)
                .post('/hometask_01/api/videos')
                .send(invalidData)
                // .expect(400); // Ждем ошибку валидации

            // Проверяем структуру ответа об ошибке
            expect(response.body).toHaveProperty('errorsMessages');
            expect(response.body.errorsMessages[0]).toMatchObject({
                field: "author",
                message: expect.any(String) // Текст может быть чуть другим, главное слово Title
            });
        });

        it('should return 400 Bad Request if availableResolutions contains invalid values', async () => {
            const invalidData = { ...validVideoData, availableResolutions: ['P999'] };

            const response = await request(app)
                .post('/hometask_01/api/videos')
                .send(invalidData)
                // .expect(400);

            expect(response.body.errorsMessages[0]).toMatchObject({
                field: 'availableResolutions',
                message: expect.stringContaining('P999')
            });
        });
    });


    // --- БЛОК ТЕСТОВ (GET ALL) ---
    describe('GET /hometask_01/api/videos - Get All Videos', () => {

        it('should get an empty array when no videos exist', async () => {
            const response = await request(app)
                .get('/hometask_01/api/videos')
                // .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });

        it('should get the list of created videos', async () => {
            // Сначала создаем видео
            await request(app).post('/hometask_01/api/videos').send(validVideoData)
                // .expect(201);
            // await request(app).post('/videos').send(validVideoData).expect(201);

            // Теперь запрашиваем список
            const response = await request(app)
                .get('/hometask_01/api/videos')
                .expect(200);

            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(1);
            expect(response.body[0].title).toBe(validVideoData.title);
        });
    });


    // --- БЛОК ТЕСТОВ (DELETE) ---
    describe('DELETE /hometask_01/api/videos/:id - Delete Video', () => {
        let videoId: number;

        // Создаем видео перед каждым тестом в этом блоке,
        // чтобы у нас был валидный id для удаления.
        beforeEach(async () => {
            const createRes = await request(app)
                .post('/hometask_01/api/videos')
                .send(validVideoData)
                // .expect(201);
            videoId = createRes.body.id;
        });

        it('should delete an existing video and return status 204', async () => {
            // Отправляем запрос на удаление
            await request(app)
                .delete(`/hometask_01/api/videos/${videoId}`)
                // .expect(204); // No Content

            // Проверяем, что видео действительно удалено, попытавшись получить его по id
            await request(app)
                .get(`/hometask_01/api/videos/${videoId}`)
                .expect(404); // Not Found
        });

        it('should return 404 when trying to delete a non-existent video', async () => {
            // Используем заведомо несуществующий id (например, 99999)
            const nonExistentId = 99999;

            await request(app)
                .delete(`/hometask_01/api/videos/${nonExistentId}`)
                .expect(404); // Not Found
        });
    });


    // --- БЛОК ТЕСТОВ (PUT) ---
    describe('PUT /hometask_01/api/videos/:id - Update Video', () => {
        let videoId: number;

        beforeEach(async () => {
            // Создаем видео перед каждым тестом в этом блоке, чтобы получить его id
            const createRes = await request(app).post('/hometask_01/api/videos').send(validVideoData)
                // .expect(201);
            videoId = createRes.body.id;
        });

        it('should update a video with valid data and return status 204', async () => {
            const updateData = { title: 'Новое название' };
            await request(app)
                .put(`/hometask_01/api/videos/${videoId}`)
                .send(updateData)
                .expect(204); // No Content

            // Проверяем, что данные обновились через GET запрос
            const getRes = await request(app).get(`/hometask_01/api/videos/${videoId}`).expect(200);
            expect(getRes.body.title).toBe(updateData.title);
        });

        it('should return 400 for invalid update data', async () => {
            const invalidData = { title: '' };
            const response = await request(app)
                .put(`/hometask_01/api/videos/${videoId}`)
                .send(invalidData)
                .expect(400);

            expect(response.body).toHaveProperty('errorsMessages');
            expect(response.body.errorsMessages[0]).toMatchObject({
                field: 'title',
                message: expect.stringContaining('Title')
            });
        });
    });
});