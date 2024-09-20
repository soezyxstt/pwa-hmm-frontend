import AdminHeader from "@/components/admin/header";
import AdminBreadcrumb from "@/components/admin/breadcrumb";
import Wrapper from "@/app/portal/atur-atur/wrapper";
import AddForm from "./add-form";

export default function Add() {
  return <>
    <AdminHeader title='Add Course'/>
    <AdminBreadcrumb/>
    <Wrapper>
      <AddForm/>
    </Wrapper>
  </>
}