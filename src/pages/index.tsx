import { BONUS_TYPES, calculateBonus } from '@/utils/calculate-bonus';
import { ChangeEvent, FormEvent, useState } from 'react';
import * as XLSX from 'xlsx';

type Bonus = {
  depSoan: number;
  laiXe: number;
  phuXe: number;
  bonusDepSoan: number;
  bonusLaiXe: number;
  bonusPhuXe: number;
};

export type Employee = {
  name: string;
  bonus: Bonus;
};

type Data = {
  'lái xe': string;
  ngày: number;
  'người xử lý đơn': string;
  'phụ xe': string;
  'số lượng đôi': number;
  đơn: string;
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer);
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data: Data[] = XLSX.utils.sheet_to_json(ws);

    let copiedEmployees = [...employees];
    // loop through each excel row
    data.forEach((row) => {
      if (row['người xử lý đơn']) {
        calculateBonus(
          BONUS_TYPES.NGUOI_XU_LY,
          row['số lượng đôi'],
          row['người xử lý đơn'],
          copiedEmployees
        );
      }
      if (row['lái xe']) {
        calculateBonus(
          BONUS_TYPES.LAI_XE,
          row['số lượng đôi'],
          row['lái xe'],
          copiedEmployees
        );
      }
      if (row['phụ xe']) {
        calculateBonus(
          BONUS_TYPES.PHU_XE,
          row['số lượng đôi'],
          row['phụ xe'],
          copiedEmployees
        );
      }
    });
    setEmployees(copiedEmployees);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      alert('Chưa chọn file');
      return;
    }

    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="bonusFile"
          accept=".xlsx"
          onChange={handleChange}
        />
        <button>Gửi đi</button>
      </form>
      <div>
        <h2>Danh sách thưởng</h2>
        {employees.map((employee) => {
          const totalBonus =
            employee.bonus.bonusPhuXe +
            employee.bonus.bonusLaiXe +
            employee.bonus.bonusDepSoan;
          return (
            <li key={employee.name}>
              <h3>{employee.name}</h3>
              <p>
                Số lượng dép soạn chính xác (đôi):{' '}
                {employee.bonus.depSoan.toLocaleString('en-US')}
              </p>
              <p>
                Số lượng dép lái xe chính xác (đôi):{' '}
                {employee.bonus.laiXe.toLocaleString('en-US')}
              </p>
              <p>
                Số lượng dép phụ xe chính xác (đôi):{' '}
                {employee.bonus.phuXe.toLocaleString('en-US')}
              </p>
              <p>
                Thưởng soạn hàng chính xác (vnd):{' '}
                {employee.bonus.bonusDepSoan.toLocaleString('en-US')}
              </p>
              <p>
                Thưởng lái xe tải giao hàng hiệu quả (vnd):
                {employee.bonus.bonusLaiXe.toLocaleString('en-US')}
              </p>
              <p>
                Thưởng phụ xe tải giao hàng hiệu quả (vnd):
                {employee.bonus.bonusPhuXe.toLocaleString('en-US')}
              </p>
              <p>
                Tổng thưởng (vnd):
                {totalBonus.toLocaleString('en-US')}
              </p>
            </li>
          );
        })}
      </div>
    </>
  );
}
