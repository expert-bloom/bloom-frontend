import { useMemo } from 'react';

const categories = [
  {
    title: 'Web, Mobile & Software Dev',
    items: [
      { label: 'All - Web, Mobile & Software Dev' },
      { label: 'Blockchain, NFT & Cryptocurrency' },
      { label: ' Desktop Application Development' },
      { label: 'Ecommerce Development' },
      { label: 'Game Design & Development' },
      { label: 'Mobile Development' },
      { label: 'Other - Software Development' },
      { label: 'Product Management' },
      { label: 'QA Testing' },
      { label: 'Scripts & Utilities' },
      { label: 'Web & Mobile Design' },
      { label: 'Web Development' },
    ],
  },
  {
    title: 'Accounting & Consulting',
    items: [
      { label: 'All - Accounting & Consulting' },
      { label: 'Accounting & Bookkeeping' },
      { label: 'Financial Planning' },
      { label: 'Management Consulting & Analysis' },
      { label: 'Other - Accounting & Consulting' },
      { label: 'Personal & Professional Coaching' },
      { label: 'Recruiting & Human Resources' },
    ],
  },
  {
    title: 'Admin Support',
    items: [
      { label: 'All - Admin Support' },
      { label: 'Data Entry' },
      { label: 'Personal / Virtual Assistant' },
      { label: 'Project Management' },
      { label: 'Transcription' },
      { label: 'Web Research / Market ' },
      { label: 'Other - Admin Support' },
    ],
  },
  {
    title: 'Customer Service',
    items: [
      { label: 'All - Customer Service' },
      { label: 'Customer Service' },
      { label: 'Technical Support' },
      { label: 'Other - Customer Service' },
    ],
  },
  {
    title: 'Data Science & Analytics',
    items: [
      { label: 'All - Data Science & Analytics' },
      { label: 'A/B Testing' },
      { label: 'Data Extraction / ETL' },
      { label: 'Data Mining & Management' },
      { label: 'Data Visualization' },
      { label: 'Machine Learning' },
      { label: 'Quantitative Analysis' },
      { label: 'Other - Data Science & Analytics' },
    ],
  },
  {
    title: 'Design & Creative',
    items: [
      { label: 'All - Design & Creative' },
      { label: 'Animation' },
      { label: 'Audio Production' },
      { label: 'Graphic Design' },
      { label: 'Illustration' },
      { label: 'Audio & Music Production' },
      { label: 'Photography' },
      { label: 'Branding & Logo Design' },
      { label: 'Presentations' },
      { label: 'NFT, AR/VR & Game Art' },
      { label: 'Product Design' },
      { label: 'Video & Animation' },
    ],
  },
  {
    title: 'Engineering & Architecture',
    items: [
      { label: 'All - Engineering & Architecture' },
      { label: '3D Modeling & CAD' },
      { label: 'Building & Landscape Architecture' },
      { label: 'Chemical Engineering' },
      { label: 'Civil & Structural Engineering' },
      { label: 'Contract Manufacturing' },
      { label: 'Electrical & Electronic Engineering' },
      { label: 'Energy & Mechanical Engineering' },
      { label: 'Interior & Trade Show Design' },
      { label: 'Physical Sciences' },
    ],
  },
  {
    title: 'IT & Networking',
    items: [
      { label: 'All - IT & Networking' },
      { label: 'Database Management & Administration' },
      { label: 'DevOps & Solution Architecture' },
      { label: 'ERP/CRM Software' },
      { label: 'Information Security & Compliance' },
      { label: 'Network & System Administration' },
    ],
  },
  {
    title: 'Sales & Marketing',
    items: [
      { label: 'All - Sales & Marketing' },
      { label: 'Digital Marketing' },
      { label: 'Lead Generation & Telemarketing' },
      { label: 'Marketing, PR & Brand Strategy' },
    ],
  },
];

export default categories;
export function useIndustry() {
  return useMemo(() => {
    return categories
      .map((c) => [...c.items.map((item) => ({ ...item, title: c.title }))])
      .flat();
  }, []);
}
