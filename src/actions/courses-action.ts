'use server';

import {cache} from 'react';
import {fetchAction} from "@/lib/fetch";
import {
  $CourseAPI as courseAPI,
  $CourseLessonAPI as lessonAPI,
  $CourseLessonVideoAPI as videoAPI,
} from "lms-types";

export const getEnrolledCourses = fetchAction<courseAPI.GetEnrolledCourses["data"]>(courseAPI.GetEnrolledCoursesUrl(), 'Failed to fetch courses', {
  queryParams: {
    include_author: true,
    include_category: false,
    limit_student_courses: 5,
    limit_instructor_courses: 5,
    "role[]": 'STUDENT',
  }
});

export const getCourses = fetchAction<courseAPI.GetCourses["data"]>(courseAPI.GetCoursesUrl(), 'Failed to fetch courses', {
  queryParams: {
    include_author: true,
    include_category: true,
    pageSize: 1,
    pageNumber: 1,
  },
});

export const getLessons = async (courseId: string) => await fetchAction<lessonAPI.GetLessons["data"]>(lessonAPI.GetLessonsUrl(Number(courseId)), 'Failed to fetch lessons')();

export const getVideos = async (courseId: string | number, lessonId: string | number) => await fetchAction<videoAPI.GetVideos["data"]>(videoAPI.GetVideosUrl(Number(courseId), Number(lessonId)), 'Failed to fetch videos')();

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
