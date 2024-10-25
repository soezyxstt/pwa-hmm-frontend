'use server';

import {fetchAction} from "@/lib/fetch";
import {$CourseClassAPI} from "lms-types";
import {actionClient} from "@/lib/action-client";
import {handleError, PWAError} from "@/lib/error";
import {env} from "@/env";
import {verifySession} from "@/lib/session";
import {} from "@/lib/schema";
import {flattenValidationErrors} from "next-safe-action";
import {cookieGenerator} from "@/lib/utils";
import {revalidatePath} from "next/cache";

export const getClasses = async (courseId: number) => await fetchAction<$CourseClassAPI.GetClasses.Response["data"]>($CourseClassAPI.GetClasses.generateUrl(courseId))()