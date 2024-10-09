//@ts-ignore
import ContentLoader from 'react-content-loader'

export const EventCardSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={450}
      height={520}
      viewBox='0 0 450 520'
      backgroundColor='#dedede'
      foregroundColor='#cccccc'
      uniqueKey='my-unique-key'
    >
      <rect
        x='0'
        y='0'
        rx='15'
        ry='15'
        width='450'
        height='250'
      />
      <rect
        x='20'
        y='280'
        rx='15'
        ry='15'
        width='300'
        height='32'
      />
      <rect
        x='20'
        y='340'
        rx='12'
        ry='12'
        width='410'
        height='26'
      />
      <rect
        x='20'
        y='380'
        rx='12'
        ry='12'
        width='380'
        height='26'
      />
      <rect
        x='20'
        y='420'
        rx='12'
        ry='12'
        width='400'
        height='26'
      />
      <rect
        x='20'
        y='462'
        rx='8'
        ry='8'
        width='120'
        height='38'
      />
      <rect
        x='160'
        y='462'
        rx='8'
        ry='8'
        width='140'
        height='36'
      />
    </ContentLoader>
  )
}
