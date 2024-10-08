// add this file forces NextJS build `/bang-diem/*` to use Dynamic Function.
//    - use fetch: has cache by default
//    - use 3rd party (supabase, drizzle): no cache, if need cache please use unstbale_cache
//
// remove this file to use Static File and it has cache, then we need to revalidate on demand.
// seems like using unstable_cache

export default function Loading() {
  return (
    <>
      <div className="-mt-24 container mx-auto h-screen flex justify-center items-center">
        <div>
          <svg
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotating"
          >
            <path
              d="M44.999 90C69.8518 90 89.999 69.8528 89.999 45C89.999 20.1472 69.8518 0 44.999 0C20.1462 0 -0.000976562 20.1472 -0.000976562 45C-0.000976562 69.8528 20.1462 90 44.999 90Z"
              fill="#77B255"
            />
            <path
              d="M64.999 45.0001C64.999 60.1201 71.979 70.5526 79.504 73.8651C86.049 66.0501 89.999 55.9901 89.999 45.0001C89.999 34.0101 86.049 23.9501 79.504 16.1351C71.979 19.4476 64.999 29.8801 64.999 45.0001Z"
              fill="#A6D388"
            />
            <path
              d="M67.498 45C67.498 29.88 71.978 19.4475 79.503 16.135C78.3905 14.8075 77.188 13.565 75.933 12.375C68.513 16.5125 62.498 26.445 62.498 45C62.498 63.5525 68.513 73.4875 75.933 77.625C77.188 76.435 78.393 75.1925 79.503 73.865C71.978 70.5525 67.498 60.12 67.498 45Z"
              fill="white"
            />
            <path
              d="M24.999 45.0001C24.999 29.8801 18.019 19.4501 10.494 16.1351C3.94902 23.9501 -0.000976562 34.0101 -0.000976562 45.0001C-0.000976562 55.9901 3.94902 66.0501 10.494 73.8651C18.019 70.5501 24.999 60.1201 24.999 45.0001Z"
              fill="#A6D388"
            />
            <path
              d="M10.4943 16.1347C18.0193 19.4497 22.4993 29.8797 22.4993 44.9997C22.4993 60.1197 18.0193 70.5497 10.4943 73.8647C11.6068 75.1922 12.8093 76.4322 14.0643 77.6247C21.4818 73.4872 27.4993 63.5522 27.4993 44.9997C27.4993 26.4472 21.4843 16.5122 14.0643 12.3772C12.8093 13.5672 11.6043 14.8072 10.4943 16.1347V16.1347Z"
              fill="white"
            />
          </svg>
          <p className="text-center text-sm mt-2 text-gray-400">Đang tải...</p>
        </div>
      </div>
    </>
  )
}
