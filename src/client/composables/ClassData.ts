export interface ClassDataObject {
  classList: { [key: string]: Array<String> };
  userName: string;
  userClassCode: string;
}

export type ClassData = ClassDataObject | null;

export default ClassData;
