'use server';

import {fetchAction} from "@/lib/fetch";
import {$UserAPI as userAPI} from "lms-types";

type getUserAssignmentsRT = userAPI.GetUserAssignments.Response["data"];

export const getAssignments = fetchAction<getUserAssignmentsRT>
  ('/users/:userId/assignments', 'Failed to fetch assignments');
