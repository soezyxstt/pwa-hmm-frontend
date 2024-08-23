'use server';

import {fetchAction} from "@/lib/fetch";
import {$CourseClassAssignmentAPI as assignmentAPI} from "lms-types";

export const getAssignments = fetchAction<assignmentAPI.GetAssignments>('/users/:userId/assignments', 'Failed to fetch assignments');
