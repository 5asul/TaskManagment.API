import prisma from '../prisma/client';

beforeAll(async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
});

afterAll(async () => {
    await prisma.$disconnect();
}); 