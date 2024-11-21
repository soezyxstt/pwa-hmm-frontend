import { actionClient } from '@/lib/action-client';
import { flattenValidationErrors } from 'next-safe-action';
import { fetchAction } from '@/lib/fetch';
import { $EventAPI } from 'lms-types';
import { addEventSchema, deleteEventSchema, updateEventSchema } from '@/lib/schema';

export const getEvents = fetchAction<$EventAPI.GetEvents.Response['data']>(
  $EventAPI.GetEvents.generateUrl(),
  'Failed to fetch events'
);

export const getEventById = async (eventId: string) =>
  await fetchAction<$EventAPI.GetEventById.Response['data']>(
    $EventAPI.GetEventById.generateUrl(Number(eventId)),
    'Failed to fetch event'
  )();

export const createEvent = actionClient
  .metadata({
    actionName: 'createEvent',
  })
  .schema(addEventSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const res = await fetchAction<$EventAPI.CreateEvent.Response['data']>(
      $EventAPI.CreateEvent.generateUrl(),
      'Failed to create event',
      {
        method: 'POST',
        bodyObject: parsedInput,
      }
    )();
    return res;
  });

export const updateEvent = actionClient
  .metadata({
    actionName: 'updateEvent',
  })
  .schema(updateEventSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const { id, ...updateData } = parsedInput;
    const res = await fetchAction<$EventAPI.UpdateEvent.Response['data']>(
      $EventAPI.UpdateEvent.generateUrl(id),
      'Failed to update event',
      {
        method: 'PUT',
        bodyObject: updateData,
      }
    )();
    return res;
  });

export const deleteEvent = actionClient
  .metadata({
    actionName: 'deleteEvent',
  })
  .schema(deleteEventSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { eventId } }) => {
    const res = await fetchAction<$EventAPI.DeleteEvent.Response['data']>(
      $EventAPI.DeleteEvent.generateUrl(eventId),
      'Failed to delete event'
    )();
    return res;
  });

