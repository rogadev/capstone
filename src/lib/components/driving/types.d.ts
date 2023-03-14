export type TripStop = {
  id: string;
  type: 'pickup' | 'dropoff';
  passenger: Passenger;
  location: Location;
  time: string;
  complete: boolean;
  completedAt: Date | null;
  completedType: CompletionOptions | null;
  driverNotes: string | null;
};

export type Passenger = {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes: string | null;
};

export type Location = {
  id: string;
  name: string | null;
  address: string;
};

export type CompletionOptions = 'Arrived On Time' | 'Arrived Late' | 'Passenger No Show' | 'Driver No Show' | 'Other';