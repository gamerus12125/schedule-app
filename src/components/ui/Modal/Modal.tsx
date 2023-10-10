const Modal = ({children}: {children: React.ReactNode}) => {
  return <div className="absolute inset-0 top-32 max-h-fit z-50 mx-auto bg-gray-900 p-5 rounded-lg shadow-lg max-w-screen-lg">{children}</div>
}

export default Modal