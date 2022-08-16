import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MenuAlt2Icon } from "@heroicons/react/solid";

const solutions = [
  {
    name: "Trang chủ",
    href: "/",
  },
  {
    name: "Các giải đấu",
    href: "giai-dau",
  },
  {
    name: "Bảng Điểm",
    href: "bang-diem",
  },
  {
    name: "Hình Ảnh",
    href: "hinh-anh",
  },
];

export default function MenuButton({ className }: { className: string }) {
  return (
    <div>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md p-1 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <MenuAlt2Icon className="w-10 h-10 text-white bg-primary rounded-md" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-14 -left-10 z-10 w-screen pl-8">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="focus-visible:ring-orange-500 -m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-opacity-50"
                      >
                        <div className="ml-4">
                          <h2 className="text-sm uppercase text-gray-900">
                            {item.name}
                          </h2>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
