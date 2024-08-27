'use server'

import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { revalidatePath } from 'next/cache'

import { s3Client } from '@/lib/s3-client'

export async function deleteImage(key: string) {
  const deleteObjectParams = new DeleteObjectCommand({
    Bucket: 'mp-galeria-codante',
    Key: key,
  })

  try {
    await s3Client.send(deleteObjectParams)
    revalidatePath('/')

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Alguma coisa deu errado.',
    }
  }
}
