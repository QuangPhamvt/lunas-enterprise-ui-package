import { useTanStackForm } from '@/components/features/tanstack-form';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/inputs/number-input';

import type { Meta, StoryObj } from '@storybook/react-vite';

const CATEGORIES = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'books', label: 'Books' },
  { value: 'toys', label: 'Toys & Games' },
  { value: 'sports', label: 'Sports' },
  { value: 'home', label: 'Home & Garden' },
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Simple Array Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Compact table (column headers + bare inputs per row) ────────────────────

type OrderLine = {
  name: string | null;
  unitPrice: number | null;
  qty: number | null;
  taxRate: string;
};

/**
 * Column-header style: labels sit in a header row; each array row uses bare
 * inputs (no per-row labels). This matches the classic spreadsheet / order-
 * line form pattern.
 */
export const CompactTable: Story = {
  render: () => {
    const { AppForm, AppField, TanStackContainerForm, TanStackSectionForm, ArrayCol, ArrayHeaderRow } = useTanStackForm({
      defaultValues: {
        lines: [
          { name: 'TS-001', unitPrice: 10, qty: 20, taxRate: '0.08' },
          { name: null, unitPrice: null, qty: null, taxRate: '0.10' },
          { name: null, unitPrice: null, qty: null, taxRate: '0.10' },
        ] as OrderLine[],
      },
    });

    return (
      <div className="bg-muted-bg-subtle p-6">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Order Lines">
              <div className="px-4 pb-4">
                <ArrayHeaderRow>
                  <ArrayCol>Product Name</ArrayCol>
                  <ArrayCol width={96} className="text-right">
                    単価
                  </ArrayCol>
                  <ArrayCol width={80} className="text-right">
                    個数
                  </ArrayCol>
                  <ArrayCol width={112}>税率</ArrayCol>
                </ArrayHeaderRow>

                <AppField name="lines">
                  {({ SimpleArrayField }) => (
                    <SimpleArrayField<OrderLine> defaultRow={{ name: null, unitPrice: null, qty: null, taxRate: '0.10' }} addLabel="Add line">
                      {i => (
                        <>
                          <ArrayCol>
                            <AppField name={`lines[${i}].name`}>
                              {({ state, handleBlur, handleChange }) => (
                                <Input
                                  value={state.value ?? ''}
                                  placeholder="Product name"
                                  onChange={e => handleChange(e.target.value || null)}
                                  onBlur={handleBlur}
                                />
                              )}
                            </AppField>
                          </ArrayCol>
                          <ArrayCol width={96}>
                            <AppField name={`lines[${i}].unitPrice`}>
                              {({ state, handleBlur, handleChange }) => (
                                <NumberInput
                                  value={state.value as number | null}
                                  placeholder="0"
                                  unitText="¥"
                                  onValueChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              )}
                            </AppField>
                          </ArrayCol>
                          <ArrayCol width={80}>
                            <AppField name={`lines[${i}].qty`}>
                              {({ state, handleBlur, handleChange }) => (
                                <NumberInput value={state.value as number | null} placeholder="0" onValueChange={handleChange} onBlur={handleBlur} />
                              )}
                            </AppField>
                          </ArrayCol>
                          <ArrayCol width={112}>
                            <AppField name={`lines[${i}].taxRate`}>
                              {({ SimpleSelectField }) => (
                                <SimpleSelectField
                                  options={[
                                    { value: '0.08', label: '8%' },
                                    { value: '0.10', label: '10%' },
                                  ]}
                                />
                              )}
                            </AppField>
                          </ArrayCol>
                        </>
                      )}
                    </SimpleArrayField>
                  )}
                </AppField>
              </div>
            </TanStackSectionForm>
          </TanStackContainerForm>
        </AppForm>
      </div>
    );
  },
};

// ─── Simple fields inside array (select focus) ───────────────────────────────

type Contact = { name: string | null; type: string | null; country: string | null };

export const WithSimpleFields: Story = {
  render: () => {
    const { AppForm, AppField, TanStackContainerForm, TanStackSectionForm, ArrayCol } = useTanStackForm({
      defaultValues: {
        contacts: [
          { name: 'Alice', type: 'customer', country: 'jp' },
          { name: null, type: null, country: null },
        ] as Contact[],
      },
    });

    return (
      <div className="bg-muted-bg-subtle p-6">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Contacts">
              <div className="px-4 pb-4">
                <AppField name="contacts" mode="array">
                  {({ SimpleArrayField }) => (
                    <SimpleArrayField<Contact> defaultRow={{ name: null, type: null, country: null }} addLabel="Add contact">
                      {i => (
                        <>
                          <ArrayCol>
                            <AppField name={`contacts[${i}].name`}>
                              {({ SimpleTextField }) => <SimpleTextField label="Name" placeholder="Full name" />}
                            </AppField>
                          </ArrayCol>
                          <ArrayCol width={160}>
                            <AppField name={`contacts[${i}].type`}>
                              {({ SimpleSelectField }) => (
                                <SimpleSelectField
                                  label="Type"
                                  placeholder="Select type"
                                  options={[
                                    { value: 'customer', label: 'Customer' },
                                    { value: 'supplier', label: 'Supplier' },
                                    { value: 'partner', label: 'Partner' },
                                  ]}
                                />
                              )}
                            </AppField>
                          </ArrayCol>
                          <ArrayCol width={160}>
                            <AppField name={`contacts[${i}].country`}>
                              {({ SimpleSelectField }) => (
                                <SimpleSelectField
                                  label="Country"
                                  placeholder="Select country"
                                  options={[
                                    { value: 'jp', label: '🇯🇵 Japan' },
                                    { value: 'vn', label: '🇻🇳 Vietnam' },
                                    { value: 'us', label: '🇺🇸 USA' },
                                  ]}
                                />
                              )}
                            </AppField>
                          </ArrayCol>
                        </>
                      )}
                    </SimpleArrayField>
                  )}
                </AppField>
              </div>
            </TanStackSectionForm>
          </TanStackContainerForm>
        </AppForm>
      </div>
    );
  },
};

// ─── Combobox + number + boolean (product catalog) ───────────────────────────

type Product = { name: string | null; category: string | null; price: number | null; active: boolean | null };

/**
 * Compact table using `SimpleComboboxField`, `SimpleNumberField`, and `SimpleBooleanField`
 * (switch variant) alongside `SimpleTextField`.
 */
export const WithComboboxAndBoolean: Story = {
  render: () => {
    const { AppForm, AppField, TanStackContainerForm, TanStackSectionForm, ArrayCol, ArrayHeaderRow } = useTanStackForm({
      defaultValues: {
        products: [
          { name: 'Wireless Headphones', category: 'electronics', price: 12000, active: true },
          { name: null, category: null, price: null, active: false },
        ] as Product[],
      },
    });

    return (
      <div className="bg-muted-bg-subtle p-6">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Product Catalog">
              <div className="px-4 pb-4">
                <ArrayHeaderRow>
                  <ArrayCol>Name</ArrayCol>
                  <ArrayCol width={180}>Category</ArrayCol>
                  <ArrayCol width={112}>Price (¥)</ArrayCol>
                  <ArrayCol width={72}>Active</ArrayCol>
                </ArrayHeaderRow>

                <AppField name="products">
                  {({ SimpleArrayField }) => (
                    <SimpleArrayField<Product> defaultRow={{ name: null, category: null, price: null, active: false }} addLabel="Add product">
                      {i => (
                        <>
                          <ArrayCol>
                            <AppField name={`products[${i}].name`}>{({ SimpleTextField }) => <SimpleTextField placeholder="Product name" />}</AppField>
                          </ArrayCol>
                          <ArrayCol width={180}>
                            <AppField name={`products[${i}].category`}>
                              {({ SimpleComboboxField }) => <SimpleComboboxField placeholder="Search…" options={CATEGORIES} />}
                            </AppField>
                          </ArrayCol>
                          <ArrayCol width={112}>
                            <AppField name={`products[${i}].price`}>{({ SimpleNumberField }) => <SimpleNumberField placeholder="0" unit="¥" />}</AppField>
                          </ArrayCol>
                          <ArrayCol width={72} className="flex items-center pt-1">
                            <AppField name={`products[${i}].active`}>{({ SimpleBooleanField }) => <SimpleBooleanField variant="switch" />}</AppField>
                          </ArrayCol>
                        </>
                      )}
                    </SimpleArrayField>
                  )}
                </AppField>
              </div>
            </TanStackSectionForm>
          </TanStackContainerForm>
        </AppForm>
      </div>
    );
  },
};

// ─── Date + radio + textarea (task scheduler) ────────────────────────────────

type Task = { title: string | null; dueDate: Date | null; priority: string | null; notes: string | null };

/**
 * Card-row style using `SimpleDateField`, `SimpleRadioGroupField`, and `SimpleTextareaField`.
 * Fields that need vertical space are a natural fit for the card-row pattern.
 */
export const WithDateAndTextarea: Story = {
  render: () => {
    const { AppForm, AppField, TanStackContainerForm, TanStackSectionForm, ArrayCol } = useTanStackForm({
      defaultValues: {
        tasks: [
          { title: 'Design review', dueDate: new Date(), priority: 'high', notes: null },
          { title: null, dueDate: null, priority: 'medium', notes: null },
        ] as Task[],
      },
    });

    return (
      <div className="bg-muted-bg-subtle p-6">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Task Schedule">
              <div className="px-4 pb-4">
                <AppField name="tasks">
                  {({ SimpleArrayField }) => (
                    <SimpleArrayField<Task> defaultRow={{ title: null, dueDate: null, priority: 'medium', notes: null }} addLabel="Add task">
                      {i => (
                        <div className="flex gap-3 rounded-md border border-border bg-card px-3 py-3">
                          <ArrayCol>
                            <AppField name={`tasks[${i}].title`}>{({ SimpleTextField }) => <SimpleTextField label="Task" placeholder="Task title" />}</AppField>
                          </ArrayCol>
                          <ArrayCol width={180}>
                            <AppField name={`tasks[${i}].dueDate`}>
                              {({ SimpleDateField }) => <SimpleDateField label="Due date" placeholder="Pick a date" />}
                            </AppField>
                          </ArrayCol>
                          <ArrayCol width={160}>
                            <AppField name={`tasks[${i}].priority`}>
                              {({ SimpleRadioGroupField }) => <SimpleRadioGroupField label="Priority" options={PRIORITY_OPTIONS} />}
                            </AppField>
                          </ArrayCol>
                          <ArrayCol>
                            <AppField name={`tasks[${i}].notes`}>
                              {({ SimpleTextareaField }) => <SimpleTextareaField label="Notes" placeholder="Optional notes…" rows={3} />}
                            </AppField>
                          </ArrayCol>
                        </div>
                      )}
                    </SimpleArrayField>
                  )}
                </AppField>
              </div>
            </TanStackSectionForm>
          </TanStackContainerForm>
        </AppForm>
      </div>
    );
  },
};

// ─── Labeled rows (Simple* fields with labels per row) ────────────────────────

type Member = { name: string | null; email: string | null; role: string | null };

/**
 * Card-row style: each row uses the Simple* field atoms directly, so labels
 * appear above every input. Works well when rows have different widths or
 * when the form is narrow.
 */
export const LabeledRows: Story = {
  render: () => {
    const { AppForm, AppField, TanStackContainerForm, TanStackSectionForm, ArrayCol } = useTanStackForm({
      defaultValues: {
        members: [
          { name: 'Tom', email: 'tom@example.com', role: 'admin' },
          { name: 'Yuki', email: 'yuki@example.com', role: 'editor' },
        ] as Member[],
      },
    });

    return (
      <div className="bg-muted-bg-subtle p-6">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Team Members">
              <div className="px-4 pb-4">
                <AppField name="members">
                  {({ SimpleArrayField }) => (
                    <SimpleArrayField<Member> defaultRow={{ name: null, email: null, role: null }} addLabel="Add member">
                      {i => (
                        <div className="flex gap-3 rounded-md border border-border bg-card px-3 py-3">
                          <ArrayCol>
                            <AppField name={`members[${i}].name`}>{({ SimpleTextField }) => <SimpleTextField label="Name" placeholder="Full name" />}</AppField>
                          </ArrayCol>
                          <ArrayCol>
                            <AppField name={`members[${i}].email`}>
                              {({ SimpleEmailField }) => <SimpleEmailField label="Email" placeholder="you@example.com" />}
                            </AppField>
                          </ArrayCol>
                          <ArrayCol width={144}>
                            <AppField name={`members[${i}].role`}>
                              {({ SimpleSelectField }) => (
                                <SimpleSelectField
                                  label="Role"
                                  placeholder="Select role"
                                  options={[
                                    { value: 'admin', label: 'Admin' },
                                    { value: 'editor', label: 'Editor' },
                                    { value: 'viewer', label: 'Viewer' },
                                  ]}
                                />
                              )}
                            </AppField>
                          </ArrayCol>
                        </div>
                      )}
                    </SimpleArrayField>
                  )}
                </AppField>
              </div>
            </TanStackSectionForm>
          </TanStackContainerForm>
        </AppForm>
      </div>
    );
  },
};
