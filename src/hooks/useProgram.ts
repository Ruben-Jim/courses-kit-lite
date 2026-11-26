import { listCourses, listLessons } from '../services/contentService';
import type { Course, Lesson } from '../types/course';
import { useAsync } from './useAsync';

export interface Program {
  course: Course | null;
  lessons: Lesson[];
}

/** The main (first) course and its published lessons. Most course businesses sell one program. */
export function useProgram(courseId?: string) {
  return useAsync<Program>(async () => {
    const courses = await listCourses();
    const course = courseId ? courses.find((c) => c.id === courseId) ?? null : courses[0] ?? null;
    const lessons = course ? await listLessons(course.id) : [];
    return { course, lessons };
  }, `program:${courseId ?? 'main'}`);
}
