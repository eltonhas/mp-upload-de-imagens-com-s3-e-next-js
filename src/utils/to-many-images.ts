import { ListObjectsV2Command } from '@aws-sdk/client-s3'

import { s3Client } from '@/lib/s3-client'

export async function toManyImages() {
  const objectListParams = new ListObjectsV2Command({
    Bucket: 'mp-galeria-codante',
  })

  const objects = await s3Client.send(objectListParams)

  if (objects.Contents && objects.Contents?.length > 20) {
    return true
  } else {
    return false
  }
}
