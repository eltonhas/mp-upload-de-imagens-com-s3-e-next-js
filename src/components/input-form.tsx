'use client'

import toast from 'react-hot-toast'

import { uploadImage } from '@/actions/upload-image'

export function InputForm() {
  async function handleSubmit(formData: FormData) {
    const actionResp = await uploadImage(formData)

    if (actionResp.success) {
      toast.success('Mensagem enviada com sucesso.')
    } else {
      toast.error('Ops... ' + actionResp.message)
    }
  }
  return (
    <form action={handleSubmit} className="m-8">
      <input type="file" name="image" id="image" />
      <button className="p-2 bg-slate-600 text-white rounded">
        Enviar imagem
      </button>
    </form>
  )
}
