import React from 'react';
import Layout from '@/Layouts/Layout';
import Breadcrumb from '@/Components/Breadcrumb';

export default function PaymentLayout({ title, children, breadcrumb = [] }) {
  return (
    <Layout>
      <Breadcrumb data={breadcrumb} />
      <section className='py-section'>
        <div className='container'>
          {title && (
            <h3 className="title-section mb-8">{title}</h3>
          )}
          <div>
            {children}
          </div>
        </div>
      </section>
    </Layout>
  );
} 