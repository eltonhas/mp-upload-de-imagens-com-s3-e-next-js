import { S3Client } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    // accessKeyId: process.env.AWS_ACCESS_KEY as string,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    accessKeyId: '',
    secretAccessKey: '',
  },
})

export { s3Client }
