import React from 'react';

const Page = ({ children }) => {
  return (<section className="sds-section-wrapper">
    <section className="sds-page">
      {children}
    </section>
  </section>);
};

export default Page;
