'use client'
import toast from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'

import { deleteImage } from '@/actions/delete-image'

interface DeleteFormProps {
  key: string
}

export function DeleteForm({ key }: DeleteFormProps) {
  return (
    <form
      action={async () => {
        const actionResp = await deleteImage(key)

        if (actionResp.success) {
          toast.success('Imagem apagada com sucesso.')
        } else {
          toast.error('Ops ... ' + actionResp.message)
        }
      }}
    >
      <button className="bg-red-50 text-red-700 p-4 rounded">
        <BiTrash className="w-6 h-6" />
      </button>
    </form>
  )
}
