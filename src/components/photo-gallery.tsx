/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import Image from 'next/image'

import { s3Client } from '@/lib/s3-client'

import { DeleteForm } from './delete-form'

export async function PhotoGallery() {
  const objectListParams = new ListObjectsV2Command({
    Bucket: 'mp-galeria-codante',
  })

  const objectList = await s3Client.send(objectListParams)
  objectList.Contents?.sort((a: any, b: any) => {
    return (
      new Date(b.LastModified).getTime() - new Date(a.LastModified).getTime()
    )
  })

  const imageList = objectList.Contents?.map((object) => object.Key)

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-600 my-4">
        Galeria de fotos
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {imageList &&
          imageList.map((image, index) => (
            <div
              key={index}
              className="rounded-md overflow-hidden shadow-md bg-white w-[280px] h-[280px]"
            >
              <div className="w-[90%] h-[90%] mx-auto mt-[5%] relative group transition-colors">
                <div className="absolute flex inset-0 items-center justify-center group-hover:visible invisible group-hover:bg-gray-800 group-hover:bg-opacity-80">
                  <DeleteForm key={image ?? ''} />
                </div>
                <Image
                  width={280}
                  height={280}
                  src={`https://mp-galeria-codante.s3.amazonaws.com/${image}`}
                  alt="Dog"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
