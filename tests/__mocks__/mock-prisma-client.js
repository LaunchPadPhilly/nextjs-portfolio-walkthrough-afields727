// tests/__mocks__/mock-prisma-client.js
export const PrismaClient = function() {
  return {
    project: {
      findMany: () => [],
      findUnique: () => null,
      create: (data) => ({ id: Math.random(), ...data }),
      update: (data) => ({ id: Math.random(), ...data }),
      delete: () => ({ id: Math.random() }),
      deleteMany: () => ({ count: 0 }),
      createMany: () => ({ count: 0 }),
    },
  };
};