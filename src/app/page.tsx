import { InputForm } from '@/components/input-form'
import { PhotoGallery } from '@/components/photo-gallery'
import { UppyUpload } from '@/components/uppy-upload'

export default function Home() {
  return (
    <>
      <main className="max-w-[900px] mx-auto px-4 py-8 flex-1 text-center">
        <header>
          <h1 className="text-3xl font-black text-slate-600 mb-2">
            Foto Upload
          </h1>
          <p className="text-gray-500 mb-8 font-light">
            Galeria de fotos com Next.js, upload de imagens no S3
          </p>
        </header>
        <UppyUpload />
        <InputForm />

        <hr />

        <PhotoGallery />
      </main>
      <footer className="bg-slate-600 py-4 w-full" />
    </>
  )
}
