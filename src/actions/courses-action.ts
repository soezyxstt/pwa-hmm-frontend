'use server';

import {cache} from 'react';
import {fetchAction} from "@/lib/fetch";
import {
  $UserAPI as userAPI,
  $CourseAPI as courseAPI,
  $CourseLessonAPI as lessonAPI,
  $CourseLessonVideoAPI as videoAPI,
} from "lms-types";

export const getEnrolledCourses = fetchAction<userAPI.GetUserEnrolledAsStudentCourses.Response["data"]>(userAPI.GetUserEnrolledAsStudentCourses.generateUrl(":userId"), 'Failed to fetch courses', {
  queryParams: {
    include_author: true,
    include_category: false,
    limit_student_courses: 5,
    limit_instructor_courses: 5,
    "role[]": 'STUDENT',
  }
});

export const getCourses = fetchAction<courseAPI.GetCourses.Response["data"]>(courseAPI.GetCourses.generateUrl(), 'Failed to fetch courses', {
  queryParams: {
    include_author: true,
    include_category: true,
    pageSize: 1,
    pageNumber: 1,
  },
});

export const getLessons = async (courseId: string) => await fetchAction<lessonAPI.GetLessons.Response["data"]>(lessonAPI.GetLessons.generateUrl(Number(courseId)), 'Failed to fetch lessons')();

export const getVideos = async (courseId: string | number, lessonId: string | number) => await fetchAction<videoAPI.GetVideos.Response["data"]>(videoAPI.GetVideos.generateUrl(Number(courseId), Number(lessonId)), 'Failed to fetch videos')();

export const getVideoData = cache(async (videoId: string) => {
  const res = await fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    {cache: 'force-cache'}
  );

  if (!res.ok) {
    throw new Error('Failed to fetch video data');
  }

  return res.json();
});
