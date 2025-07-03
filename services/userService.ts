import prisma from '../prisma/client';

class UserService {
  public async createUser(data: { name: string; email: string }) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw { errors: [{ message: 'Email already exists' }] };
    return prisma.user.create({ data });
  }
}

export default new UserService();
