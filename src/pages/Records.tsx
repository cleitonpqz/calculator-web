import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import IRecord from "../types/record.type";
import { deleteRecord, getRecords } from "../services/record-service";
import { logout } from "../services/auth-service";
import { useNavigate } from "react-router-dom";

const RemotePagination = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  handleRemoveRecord,
}: {
  data: Partial<IRecord>[];
  page: number;
  sizePerPage: number;
  onTableChange: (type: any, { page, sizePerPage }: any) => void;
  totalSize: number;
  handleRemoveRecord: (id: number) => void;
}) => {
  const columns = [
    {
      dataField: "id",
      text: "Record",
    },
    {
      dataField: "operation_response",
      text: "Operation Response",
    },
    {
      dataField: "amount",
      text: "Operation Amount",
    },
    {
      dataField: "user_balance",
      text: "Balance",
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cellContent: any, row: any) => {
        return (
          <div
            onClick={(e) => handleRemoveRecord(row.id)}
            className="btn btn-primary btn-sm"
          >
            Remove
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <BootstrapTable
        remote
        bootstrap4
        keyField="id"
        data={data}
        columns={columns}
        pagination={paginationFactory({
          page,
          sizePerPage,
          totalSize,
        })}
        onTableChange={onTableChange}
      />
    </div>
  );
};

const Records = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<Partial<IRecord>[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    getRecords(page, perPage)
      .then((response) => {
        const { total, per_page, records, page } = response?.data;
        setPage(page);
        setPerPage(per_page);
        setTotal(total);
        setRecords(records);
      })
      .catch((error) => {
        logout();
        navigate("/login");
      });
  }, [navigate, page, perPage]);

  const handleTableChange = (type: any, { page, sizePerPage }: any) => {
    getRecords(page, sizePerPage).then((response) => {
      const { total, per_page, records, page } = response?.data;
      setPage(page);
      setPerPage(per_page);
      setTotal(total);
      setRecords(records);
    });
  };

  const handleRemoveRecord = (id: number) => {
    deleteRecord(id).then((response) => {
      if (response) {
        getRecords(page, perPage).then((response) => {
          const { total, per_page, records, page } = response?.data;
          setPage(page);
          setPerPage(per_page);
          setTotal(total);
          setRecords(records);
        });
      }
    });
  };

  return (
    <div>
      <h1 className="h3 mb-3 font-weight-normal">User Records</h1>
      <RemotePagination
        data={records}
        page={page}
        sizePerPage={perPage}
        totalSize={total}
        onTableChange={handleTableChange}
        handleRemoveRecord={handleRemoveRecord}
      />
    </div>
  );
};

export default Records;
