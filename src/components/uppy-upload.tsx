/* eslint-disable camelcase */
'use client'

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@/styles/uppy-style.css'

import Uppy from '@uppy/core'
import pt_BR from '@uppy/locales/lib/pt_BR'
import { Dashboard } from '@uppy/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { uploadWithUppy } from '@/actions/upload-with-uppy'

export function UppyUpload() {
  const [uppy, setUppy] = useState<Uppy | null>(null)

  useEffect(() => {
    const uppy = new Uppy({ locale: pt_BR }).on('complete', (result) => {
      const files = result.successful
      const formData = new FormData()
      files?.forEach((file) => {
        formData.append('images', file.data)
      })

      uploadWithUppy(formData).then((actionRes) => {
        uppy.cancelAll()

        if (actionRes?.success) {
          toast.success('Imagens enviadas com sucesso.')
        } else {
          toast.error('Ops... ' + actionRes?.message)
        }
      })
    })

    setUppy(uppy)
  }, [])
  return (
    <div>{uppy && <Dashboard width={'100%'} height={300} uppy={uppy} />}</div>
  )
}
