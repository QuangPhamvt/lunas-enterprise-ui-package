import { useTanStackForm } from '@/components/features/tanstack-form';
import { ArrayCol } from '@/components/features/tanstack-form/components/atoms/simple-array-field';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/inputs/number-input';

import type { Meta, StoryObj } from '@storybook/react-vite';

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
    const { AppForm, AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
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
                {/* Column headers */}
                <div className="mb-1 flex items-center gap-2 px-1 text-xs font-medium text-text-positive-weak">
                  <div className="flex-1">Product Name</div>
                  <div className="w-24 text-right">単価</div>
                  <div className="w-20 text-right">個数</div>
                  <div className="w-28">税率</div>
                  <div className="w-7" />
                </div>

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
    const { AppForm, AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
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

// ─── Labeled rows (Simple* fields with labels per row) ────────────────────────

type Member = { name: string | null; email: string | null; role: string | null };

/**
 * Card-row style: each row uses the Simple* field atoms directly, so labels
 * appear above every input. Works well when rows have different widths or
 * when the form is narrow.
 */
export const LabeledRows: Story = {
  render: () => {
    const { AppForm, AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
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
