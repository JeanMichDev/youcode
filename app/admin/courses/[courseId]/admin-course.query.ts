import { prisma } from "@/lib/prisma";

export const getAdminCourse = async ({
  courseId,
  userId,
  userPage,
}: {
  courseId: string;
  userId: string;
  userPage: number;
}) => {
  const course = await prisma.course.findUnique({
    where: {
      creatorId: userId, // sécurité, on évite que n'importe qui puisse accéder aux cours
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      users: {
        take: 5, // on affiche que 5 users par page
        skip: Math.max(0, userPage * 5), // on skip les users des pages précédentes
        select: {
          canceledAt: true,
          id: true,
          user: {
            select: {
              email: true,
              image: true,
              id: true,
            },
          },
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  const users = course?.users.map((user) => {
    return {
      canceled: user.canceledAt ? true : false,
      ...user.user,
    };
  });

  return {
    ...course,
    users,
  };
};
