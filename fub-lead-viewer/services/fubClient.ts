/**
 * FUB API Client
 * Frontend service to communicate with FUB API through our Next.js proxy routes
 */

const API_BASE = '/api/fub';

interface FubRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  params?: Record<string, string>;
}

/**
 * Generic request function to call FUB API through our proxy
 */
async function request<T>(endpoint: string, options: FubRequestOptions = {}): Promise<T> {
  const { method = 'GET', body, params } = options;

  // Build URL with query parameters
  let url = `${API_BASE}/${endpoint}`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  // Prepare fetch options
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add body for POST/PUT requests
  if (body && (method === 'POST' || method === 'PUT')) {
    fetchOptions.body = JSON.stringify(body);
  }

  // Make the request
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API request failed with status ${response.status}`);
  }

  return response.json();
}

// ============================================================================
// People API
// ============================================================================

export interface Person {
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
  emails?: Array<{ value: string; type?: string }>;
  phones?: Array<{ value: string; type?: string }>;
  stage?: string;
  created?: string;
  updated?: string;

  // Address information
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;

  // Additional contact details
  company?: string;
  jobTitle?: string;
  website?: string;

  // Source and tracking
  source?: string;
  sourceUrl?: string;
  assignedTo?: string;
  owner?: { id: number; name: string };

  // Tags and categorization
  tags?: string[];
  labels?: string[];

  // Social media
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;

  // Notes and description
  note?: string;
  description?: string;

  // Custom fields
  customFields?: Record<string, unknown>;

  // System fields
  archived?: boolean;
  lastContacted?: string;
  nextFollowUp?: string;

  // Catch-all for any additional fields
  [key: string]: unknown;
}

export interface PeopleResponse {
  people: Person[];
}

/**
 * Search for a person by email
 */
export async function getPersonByEmail(email: string): Promise<PeopleResponse> {
  return request<PeopleResponse>('people', {
    params: { email },
  });
}

/**
 * Search for a person by phone
 */
export async function getPersonByPhone(phone: string): Promise<PeopleResponse> {
  return request<PeopleResponse>('people', {
    params: { phone },
  });
}

/**
 * Get a specific person by ID
 */
export async function getPersonById(id: number): Promise<Person> {
  return request<Person>(`people/${id}`);
}

// ============================================================================
// Events API
// ============================================================================

export interface Event {
  id: number;
  personId: number;
  type: string;
  created: string;
  message?: string;
  metadata?: any;
  [key: string]: any;
}

export interface EventsResponse {
  events: Event[];
}

/**
 * Get events for a person
 */
export async function getEventsByPersonId(
  personId: number,
  type?: string
): Promise<EventsResponse> {
  const params: Record<string, string> = {
    personId: personId.toString(),
  };

  if (type) {
    params.type = type;
  }

  return request<EventsResponse>('events', { params });
}

// ============================================================================
// Appointments API
// ============================================================================

export interface Appointment {
  id: number;
  personId: number;
  title: string;
  startTime: string;
  endTime: string;
  appointmentType?: string;
  outcome?: string;
  notes?: string;
  [key: string]: any;
}

export interface AppointmentsResponse {
  appointments: Appointment[];
}

/**
 * Get appointments for a person
 */
export async function getAppointmentsByPersonId(personId: number): Promise<AppointmentsResponse> {
  return request<AppointmentsResponse>('appointments', {
    params: { personId: personId.toString() },
  });
}

/**
 * Create a new appointment
 */
export async function createAppointment(appointment: Partial<Appointment>): Promise<Appointment> {
  return request<Appointment>('appointments', {
    method: 'POST',
    body: appointment,
  });
}

/**
 * Update an existing appointment
 */
export async function updateAppointment(
  id: number,
  updates: Partial<Appointment>
): Promise<Appointment> {
  return request<Appointment>(`appointments/${id}`, {
    method: 'PUT',
    body: updates,
  });
}

// ============================================================================
// Appointment Types API
// ============================================================================

export interface AppointmentType {
  id: number;
  name: string;
  [key: string]: any;
}

export interface AppointmentTypesResponse {
  appointmentTypes: AppointmentType[];
}

/**
 * Get all appointment types
 */
export async function getAppointmentTypes(): Promise<AppointmentTypesResponse> {
  return request<AppointmentTypesResponse>('appointmentTypes');
}

// ============================================================================
// Test/Health Check
// ============================================================================

/**
 * Test the FUB API connection
 */
export async function testConnection(): Promise<any> {
  return request('people', {
    params: { limit: '1' },
  });
}
