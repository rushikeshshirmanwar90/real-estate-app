export interface PropertyProps {
  _id: string;
  userId: string;
  property: [
    {
      projectId: string;
      projectName: string;
      sectionId: string;
      sectionName: string;
      sectionType: string;
      flatId: string;
      flatName: string;
      _id: string;
      payment: [
        {
          title: string;
          percentage: string;
          date: string;
        }
      ];
    }
  ];
}

export interface UserProps {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  userType: string;
  password: string;
  clientId: string;
}
