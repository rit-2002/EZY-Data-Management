import React from 'react';

interface NoDataMessageProps {
  message: 'No Data For Now....!';
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({ message }) => {
  return (
    <section className="overflow-hidden px-16 py-56 text-2xl font-semibold text-center text-black bg-white rounded-3xl shadow-md max-md:px-5  max-md:py-24">
      {'No Data For Now...!'}
    </section>
  );
};

export default NoDataMessage;