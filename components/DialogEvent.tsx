/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import ReactMarkdown from "react-markdown";

interface Props {
  children: ReactNode;
  content: any;
}

export default function DialogEvent({ children, content }: Props) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="cursor-pointer" onClick={openModal}>
        <button className="bg-white underline p-2">Xem thêm</button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end">
                    <XCircleIcon
                      className="w-12 h-12 text-gray-500 cursor-pointer"
                      onClick={closeModal}
                    />
                  </div>
                  <h1 className="mb-4">{content.frontmatter.title}</h1>
                  <div className="my-8">
                    <img src={content.frontmatter.cover_image} alt="giai dau" />
                  </div>
                  <div className="giai-dau">
                    <ReactMarkdown>{content.content}</ReactMarkdown>
                  </div>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
