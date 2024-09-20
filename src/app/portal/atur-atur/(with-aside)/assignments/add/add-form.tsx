'use client';

import {Input, Label} from "@/app/portal/atur-atur/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {submissionsEnum} from "@/lib/schema";

function AddForm() {
  function onSubmit() {

  }

  return (
    <form onSubmit={onSubmit}>
      <Label>Title</Label>
      <Input/>
      <Label>Submissions</Label>
      <Select>
        <SelectTrigger className='mb-4 border border-navy bg-transparent'>
          <SelectValue placeholder='Select submissions'></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {submissionsEnum.map((submission) => (
              <SelectItem value={submission} key={submission}>{submission}</SelectItem>
            )
          )}
        </SelectContent>
      </Select>
      <Label>Deadline</Label>
      <div className="flex gap-6">
        <Input type='date' />
        <Input type='time' />
      </div>
      <Label>Class ID</Label>
      <Input/>
    </form>
  );
}

export default AddForm;