import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, mockUsers } from "../context/AuthContext.tsx";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Jobs", href: "#", current: false },
  { name: "Applicants", href: "#", current: false },
  { name: "Company", href: "#", current: false },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const candidates = [
  {
    name: "Emily Selman",
    email: "emily.selman@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  {
    name: "Emma Dorsey",
    email: "emma.dorsey@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  {
    name: "Anna Roberts",
    email: "anna.roberts@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  {
    name: "Leonard Krasner",
    email: "leonard.krasner@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  {
    name: "Floyd Miles",
    email: "floyd.miles@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  {
    name: "Benjamin Russel",
    email: "benjamin.russel@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  {
    name: "Lawrence Hunter",
    email: "lawrence.hunter@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  {
    name: "Alicia Bell",
    email: "alicia.bell@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
];
const publishingOptions = [
  {
    name: "Published",
    description: "This job posting can be viewed by anyone who has the link.",
    current: true,
  },
  {
    name: "Draft",
    description: "This job posting will no longer be publicly accessible.",
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId?: string }>();
  const [selected, setSelected] = useState(publishingOptions[0]);

  let displayedUser = user;
  if (userId && user?.role === "admin") {
    const target = mockUsers.find((u) => u.email === userId);
    if (target) displayedUser = target;
  }

  const userObj = {
    name: displayedUser?.name || "User",
    email: displayedUser?.email || "user@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  let tabs;
  if (displayedUser?.role === "admin") {
    tabs = [
      {
        name: "Users",
        href: "#",
        count: mockUsers.filter((u) => u.role === "user").length.toString(),
        current: false,
      },
      {
        name: "Resellers",
        href: "#",
        count: mockUsers.filter((u) => u.role === "reseller").length.toString(),
        current: false,
      },
    ];
  } else {
    tabs = [
      { name: "Applied", href: "#", count: "2", current: false },
      { name: "Phone Screening", href: "#", count: "4", current: false },
      { name: "Interview", href: "#", count: "6", current: true },
      { name: "Offer", href: "#", current: false },
      { name: "Disqualified", href: "#", current: false },
    ];
  }

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  let dynamicCandidates: any[] = [];
  if (displayedUser?.role === "admin") {
    if (selectedTab.name === "Users") {
      dynamicCandidates = mockUsers
        .filter((u) => u.role === "user")
        .map((u) => ({
          name: u.name,
          email: u.email,
          imageUrl: userObj.imageUrl,
          applied: "N/A",
          appliedDatetime: "",
          status: u.role,
        }));
    } else if (selectedTab.name === "Resellers") {
      dynamicCandidates = mockUsers
        .filter((u) => u.role === "reseller")
        .map((u) => ({
          name: u.name,
          email: u.email,
          imageUrl: userObj.imageUrl,
          applied: "N/A",
          appliedDatetime: "",
          status: u.role,
        }));
    } else {
      dynamicCandidates = [];
    }
  } else if (displayedUser?.role === "user") {
    dynamicCandidates = [
      {
        name: displayedUser.name,
        email: displayedUser.email,
        imageUrl: userObj.imageUrl,
        applied: "Today",
        appliedDatetime: new Date().toISOString(),
        status: "Active User",
      },
    ];
  } else if (displayedUser?.role === "reseller") {
    dynamicCandidates = [
      {
        name: displayedUser.name,
        email: displayedUser.email,
        imageUrl: userObj.imageUrl,
        applied: "N/A",
        appliedDatetime: "",
        status: "Active Reseller",
      },
    ];
  } else {
    dynamicCandidates = candidates;
  }

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="min-h-full">
        {/* Navbar */}
        <Disclosure as="nav" className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between border-b border-gray-200">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=violet&shade=500"
                    className="h-8 w-auto"
                  />
                </div>

                {/* Links section */}
                <div className="hidden lg:ml-10 lg:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current ? "bg-gray-100" : "hover:text-gray-700",
                          "rounded-md px-3 py-2 text-sm font-medium text-gray-900"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                {/* Search section */}
                <div className="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
                  <input
                    name="search"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-600 sm:text-sm/6"
                  />
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                  />
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>

              {/* Actions section */}
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="relative shrink-0 rounded-full bg-gray-50 p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 shrink-0">
                    <MenuButton className="relative flex rounded-full bg-gray-50 text-sm text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={userObj.imageUrl}
                        className="size-8 rounded-full"
                      />
                    </MenuButton>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {item.name === "Sign out" ? (
                            <button
                              onClick={handleSignOut}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                              {item.name}
                            </button>
                          ) : (
                            <a
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                              {item.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="border-b border-gray-200 bg-gray-50 lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current ? "bg-gray-100" : "hover:bg-gray-100",
                    "block rounded-md px-3 py-2 font-medium text-gray-900"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={userObj.imageUrl}
                    className="size-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {userObj.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {userObj.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-gray-50 p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <>
                    {item.name === "Sign out" ? (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        onClick={handleSignOut}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                      >
                        {item.name}
                      </DisclosureButton>
                    ) : (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                      >
                        {item.name}
                      </DisclosureButton>
                    )}
                  </>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        {/* Page heading */}
        <header className="bg-gray-50 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
            <div className="min-w-0 flex-1">
              <nav aria-label="Breadcrumb" className="flex">
                <ol role="list" className="flex items-center space-x-4">
                  <li>
                    <div>
                      <a
                        href="#"
                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Dashboard
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="mt-2 text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Dashboard for {displayedUser?.role || "User"}
              </h1>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <BriefcaseIcon
                    aria-hidden="true"
                    className="mr-1.5 size-5 shrink-0 text-gray-400"
                  />
                  Full-time
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPinIcon
                    aria-hidden="true"
                    className="mr-1.5 size-5 shrink-0 text-gray-400"
                  />
                  Remote
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CurrencyDollarIcon
                    aria-hidden="true"
                    className="mr-1.5 size-5 shrink-0 text-gray-400"
                  />
                  $120k &ndash; $140k
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon
                    aria-hidden="true"
                    className="mr-1.5 size-5 shrink-0 text-gray-400"
                  />
                  Closing on January 9, 2020
                </div>
              </div>
            </div>
            <div className="mt-5 flex xl:mt-0 xl:ml-4">
              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  <PencilIcon
                    aria-hidden="true"
                    className="-ml-0.5 size-5 text-gray-400"
                  />
                  Edit
                </button>
              </span>

              <span className="ml-3 hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  <LinkIcon
                    aria-hidden="true"
                    className="-ml-0.5 size-5 text-gray-400"
                  />
                  View
                </button>
              </span>

              <Listbox
                as="div"
                value={selected}
                onChange={setSelected}
                className="sm:ml-3"
              >
                <Label className="sr-only">Change published status</Label>
                <div className="relative">
                  <div className="inline-flex divide-x divide-purple-600 rounded-md shadow-xs">
                    <div className="inline-flex divide-x divide-purple-600 rounded-md shadow-xs">
                      <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-purple-500 px-3 py-2 text-white shadow-xs">
                        <CheckIcon
                          aria-hidden="true"
                          className="-ml-0.5 size-5"
                        />
                        <p className="text-sm font-semibold">{selected.name}</p>
                      </div>
                      <ListboxButton className="inline-flex items-center rounded-l-none rounded-r-md bg-purple-500 p-2 hover:bg-purple-600 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 focus-visible:outline-hidden">
                        <span className="sr-only">Change published status</span>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="size-5 text-white"
                        />
                      </ListboxButton>
                    </div>
                  </div>

                  <ListboxOptions
                    transition
                    className="absolute left-0 z-10 mt-2 -mr-1 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:right-0 sm:left-auto"
                  >
                    {publishingOptions.map((option) => (
                      <ListboxOption
                        key={option.name}
                        value={option}
                        className="group cursor-default p-4 text-sm text-gray-900 select-none data-focus:bg-purple-500 data-focus:text-white"
                      >
                        <div className="flex flex-col">
                          <div className="flex justify-between">
                            <p className="font-normal group-data-selected:font-semibold">
                              {option.name}
                            </p>
                            <span className="text-purple-500 group-not-data-selected:hidden group-data-focus:text-white">
                              <CheckIcon
                                aria-hidden="true"
                                className="size-5"
                              />
                            </span>
                          </div>
                          <p className="mt-2 text-gray-500 group-data-focus:text-purple-200">
                            {option.description}
                          </p>
                        </div>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>

              {/* Dropdown */}
              <Menu as="div" className="relative ml-3 sm:hidden">
                <MenuButton className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:ring-gray-400">
                  More
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 size-5 text-gray-400"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Edit
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      View
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </header>

        <main className="pt-8 pb-16">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
              <h2 className="text-lg font-medium text-gray-900">
                {selectedTab.name}
              </h2>

              {/* Tabs */}
              <div className="mt-4 grid grid-cols-1 sm:hidden">
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  value={selectedTab.name}
                  onChange={(e) => {
                    const tab = tabs.find((t) => t.name === e.target.value);
                    if (tab) setSelectedTab(tab);
                  }}
                  aria-label="Select a tab"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
                />
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav aria-label="Tabs" className="mt-2 -mb-px flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.name}
                        onClick={() => setSelectedTab(tab)}
                        className={classNames(
                          tab.name === selectedTab.name
                            ? "border-purple-500 text-purple-600"
                            : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
                          "border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap"
                        )}
                      >
                        {tab.name}
                        {tab.count ? (
                          <span
                            className={classNames(
                              tab.name === selectedTab.name
                                ? "bg-purple-100 text-purple-600"
                                : "bg-gray-100 text-gray-900",
                              "ml-2 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block"
                            )}
                          >
                            {tab.count}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Stacked list or User/Reseller Info */}
            {displayedUser?.role === "admin" ? (
              <ul
                role="list"
                className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0"
              >
                {dynamicCandidates.map((candidate) => (
                  <li key={candidate.email}>
                    <a
                      href={
                        user?.role === "admin"
                          ? `/dashboard/${candidate.email}`
                          : "#"
                      }
                      target={user?.role === "admin" ? "_blank" : undefined}
                      className="group block"
                    >
                      <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6">
                        <div className="flex min-w-0 flex-1 items-center">
                          <div className="shrink-0">
                            <img
                              alt=""
                              src={candidate.imageUrl}
                              className="size-12 rounded-full group-hover:opacity-75"
                            />
                          </div>
                          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <p className="truncate text-sm font-medium text-purple-600">
                                {candidate.name}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <EnvelopeIcon
                                  aria-hidden="true"
                                  className="mr-1.5 size-5 shrink-0 text-gray-400"
                                />
                                <span className="truncate">
                                  {candidate.email}
                                </span>
                              </p>
                            </div>
                            <div className="hidden md:block">
                              <div>
                                <p className="text-sm text-gray-900">
                                  Applied on{" "}
                                  <time dateTime={candidate.appliedDatetime}>
                                    {candidate.applied}
                                  </time>
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  <CheckCircleIcon
                                    aria-hidden="true"
                                    className="mr-1.5 size-5 shrink-0 text-green-400"
                                  />
                                  {candidate.status}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <ChevronRightIcon
                            aria-hidden="true"
                            className="size-5 text-gray-400 group-hover:text-gray-700"
                          />
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-5 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {displayedUser?.role === "user"
                      ? "User Profile"
                      : "Reseller Profile"}
                  </h3>
                  <div className="mt-5">
                    <div className="flex items-center">
                      <img
                        className="h-16 w-16 rounded-full"
                        src={userObj.imageUrl}
                        alt=""
                      />
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          {userObj.name}
                        </h4>
                        <p className="text-sm text-gray-500">{userObj.email}</p>
                        <p className="text-sm text-gray-500 capitalize">
                          Role: {displayedUser?.role}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <BriefcaseIcon
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                  {displayedUser?.role === "user"
                                    ? "Applications Submitted"
                                    : "Products Sold"}
                                </dt>
                                <dd className="text-lg font-medium text-gray-900">
                                  {displayedUser?.role === "user" ? "5" : "120"}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <CheckCircleIcon
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                  {displayedUser?.role === "user"
                                    ? "Interviews Scheduled"
                                    : "Active Clients"}
                                </dt>
                                <dd className="text-lg font-medium text-gray-900">
                                  {displayedUser?.role === "user" ? "2" : "15"}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <CurrencyDollarIcon
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                  {displayedUser?.role === "user"
                                    ? "Offers Received"
                                    : "Revenue This Month"}
                                </dt>
                                <dd className="text-lg font-medium text-gray-900">
                                  {displayedUser?.role === "user"
                                    ? "1"
                                    : "$5,200"}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
            <nav
              aria-label="Pagination"
              className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
            >
              <div className="-mt-px flex w-0 flex-1">
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  <ArrowLongLeftIcon
                    aria-hidden="true"
                    className="mr-3 size-5 text-gray-400"
                  />
                  Previous
                </a>
              </div>
              <div className="hidden md:-mt-px md:flex">
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  1
                </a>
                {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
                <a
                  href="#"
                  aria-current="page"
                  className="inline-flex items-center border-t-2 border-purple-500 px-4 pt-4 text-sm font-medium text-purple-600"
                >
                  2
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  3
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  4
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  5
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  6
                </a>
              </div>
              <div className="-mt-px flex w-0 flex-1 justify-end">
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  Next
                  <ArrowLongRightIcon
                    aria-hidden="true"
                    className="ml-3 size-5 text-gray-400"
                  />
                </a>
              </div>
            </nav>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
