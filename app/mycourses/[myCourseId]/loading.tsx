import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import MyCoursePlaceholder from "./MyCoursePlaceholder";

export default async function MyCoursePage() {
  return (
    <Layout>
      <GoBackItem url="/mycourses" />
      <LayoutHeader>
        <LayoutTitle>My courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <MyCoursePlaceholder />
      </LayoutContent>
    </Layout>
  );
}
