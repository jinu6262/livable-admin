import VisitorExcelDown from '@/components/admin/visitor/VisitorExcelDown';
import VisitorList from '@/components/admin/visitor/VisitorList';
import VisitorSearch from '@/components/admin/visitor/VisitorSearch';
import { getVisitors } from '@/pages/api/visitor/visitorRequests';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { VisitorListProps } from '@/types/visitor/visitor';
import testList from './testList';
import VisitorListPagenation from './VisitorListPagenation';

function Index() {
  const [visitorList, setVisitorList] = useState<VisitorListProps>();
  console.log(visitorList);

  useEffect(() => {
    setVisitorList(testList);
    const visitorsData = async () => {
      try {
        const response = await getVisitors(1, 5);
        if (response?.data) {
          console.log('test');
        }
      } catch (err) {
        //  검색 오류 예외 처리
      }
    };
    visitorsData();
  }, []);

  useEffect(() => {
    setVisitorList(testList);
  }, [setVisitorList]);

  const [page, setPage] = useState(1);
  const limit = 5; // posts가 보일 최대한의 갯수
  const offset = (page - 1) * limit; // 시작점과 끝점을 구하는 offset

  const ListData = (list: VisitorListProps) => {
    const result = list.content.slice(offset, offset + limit);
    return result;
  };

  return (
    <div css={contentStyles}>
      <VisitorSearch />

      {visitorList && (
        <>
          <VisitorExcelDown checkVisitors={visitorList.content.length} />
          <VisitorList content={ListData(visitorList)} />
          <VisitorListPagenation
            limit={limit}
            page={page}
            totalVisitors={visitorList.content.length}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
}

const contentStyles = css`
  & > * {
    padding-top: 20px;
  }
`;
export default Index;
