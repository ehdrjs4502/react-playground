// 기본적인 유니온 타입 선언
type Status = "idle" | "loading" | "success" | "error";

const stat: Status = "loading";

// 객체 키값을 유니온 타입으로 선언하는 방법
const obj = {
  name: "kim",
  age: 10,
};

type objType = keyof typeof obj;
const objkey1: objType = "age";

// 중첩 키값을 유니온 타입으로 선언하는 방법
type User = {
  id: number;
  name: string;
  status: {
    active: boolean;
    lastLogin: Date;
  };
  address: {
    street: string;
    city: string;
    zipCode: string | number;
  };
};

type TopLevelKeys = keyof User; // 1. 최상위 레벨의 키들에 대한 유니온 타입

type StatusKeys = keyof User["status"]; // 2. 중첩된 'status' 객체의 키들에 대한 유니온 타입

const topKey: TopLevelKeys = "name";
const statusKey: StatusKeys = "lastLogin";

// interface, type에서의 키값을 유니온 타입으로 선언하는 방법
interface IObj {
  name: string;
  age: number;
}

type objType2 = keyof IObj;
const objKey2: objType2 = "name";

// 배열 값을 통해 유니온 타입 선언하는 방법
const statuses = ["idle", "loading", "success", "error"] as const;

type StatusType = (typeof statuses)[number];

const status2: StatusType = "idle";

// 특정 타입만 추출하거나 제외하기
type Status3 = "idle" | "loading" | "success" | "error";

type ActiveStatus = Extract<Status3, "loading" | "success">; // "loading" | "success"
type InactiveStatus = Exclude<Status3, "loading" | "success">; // "idle" | "error"
