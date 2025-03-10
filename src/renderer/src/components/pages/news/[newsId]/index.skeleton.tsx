import React from 'react'
import ContentLoader from 'react-content-loader'

const NewsPageSkeleton = () => (
  <ContentLoader
    speed={2}
    width={1830}
    height={2000}
    viewBox='0 0 1830 2000'
    backgroundColor='#dedede'
    foregroundColor='#cccccc'
    uniqueKey='my-unique-key'
  >
    <rect
      x='0'
      y='0'
      rx='15'
      ry='15'
      width='1750'
      height='800'
    />
    <rect
      x='0'
      y='840'
      rx='5'
      ry='5'
      width='150'
      height='42'
    />
    <rect
      x='160'
      y='840'
      rx='5'
      ry='5'
      width='180'
      height='42'
    />
    <rect
      x='350'
      y='840'
      rx='5'
      ry='5'
      width='120'
      height='42'
    />
    <rect
      x='0'
      y='900'
      rx='5'
      ry='5'
      width='300'
      height='35'
    />
    <rect
      x='0'
      y='960'
      rx='5'
      ry='5'
      width='500'
      height='50'
    />
    <rect
      x='0'
      y='1030'
      rx='5'
      ry='5'
      width='1000'
      height='28'
    />
    <rect
      x='0'
      y='1078'
      rx='5'
      ry='5'
      width='800'
      height='28'
    />
    <rect
      x='0'
      y='1126'
      rx='5'
      ry='5'
      width='600'
      height='28'
    />
    <rect
      x='0'
      y='1194'
      rx='5'
      ry='5'
      width='900'
      height='28'
    />
    <rect
      x='0'
      y='1242'
      rx='5'
      ry='5'
      width='1000'
      height='28'
    />
    <rect
      x='1350'
      y='820'
      rx='10'
      ry='10'
      width='300'
      height='150'
    />
    <rect
      x='0'
      y='1290'
      rx='5'
      ry='5'
      width='800'
      height='28'
    />
    <rect
      x='0'
      y='1338'
      rx='5'
      ry='5'
      width='900'
      height='28'
    />
    <rect
      x='0'
      y='1386'
      rx='5'
      ry='5'
      width='700'
      height='28'
    />
    <rect
      x='0'
      y='1454'
      rx='5'
      ry='5'
      width='800'
      height='28'
    />
  </ContentLoader>
)

export default NewsPageSkeleton
