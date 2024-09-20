'use client';

import {Input, Label} from "@/app/portal/atur-atur/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

function AddForm() {
  function onSubmit() {

  }

  return (
    <form onSubmit={onSubmit}>
      <Label>Category</Label>
      <Input/>
      <Label>Code</Label>
      <Input/>
      <Label>Image URL</Label>
      <Input type='url'/>
      <Label>Title</Label>
      <Input/>
      <Label>Description</Label>
      <Textarea/>
      <Button type='submit' className='bg-navy mt-6'>Add Course</Button>
    </form>
  );
}

export default AddForm;