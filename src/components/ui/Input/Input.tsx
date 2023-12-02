const Input = ({type, required, placeholder, value, onChange, className}: {type: string, required: boolean, placeholder: string, value?: string, onChange?: Function, className?: string}) => {
  return <input onChange={(e) => onChange? onChange(e.target.value): undefined} type={type} required={required} value={value} placeholder={placeholder} className={' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' + className}/>
}

export default Input