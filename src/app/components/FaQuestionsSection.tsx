import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FaQuestionsSection: React.FC = () => {
    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium text-gray-900">What is the process for scheduling an installation?</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              To schedule an installation, simply contact our customer service team or use our online scheduling tool. We will confirm your preferred date and time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium text-gray-900">What are the payment options available?</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              We accept various payment methods including credit cards, PayPal, and bank transfers. For more details, please visit our payment options page.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium text-gray-900">How can I track my order status?</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              You can track your order status through our website by entering your order number in the tracking section. You will also receive email updates.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium text-gray-900">What is the warranty on your products?</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Our products come with a one-year warranty covering manufacturing defects. For more information, please refer to our warranty policy.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium text-gray-900">Can I cancel or reschedule my order?</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Yes, you can cancel or reschedule your order. Please contact our customer service team as soon as possible to make any changes.
            </AccordionContent>
          </AccordionItem>
          </Accordion>
        </div>
      );
    };
    

export default FaQuestionsSection;