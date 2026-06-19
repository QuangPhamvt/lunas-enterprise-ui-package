import { useState } from 'react';

import z, { email } from 'zod';

import { Button } from '@/components/ui/button';
import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const schema = z.object({
  textField: z.string().min(10, 'Text Field is required'),
  textareaField: z.string().min(20, 'Textarea is required'),
  numberField: z.number().gte(5, { message: 'Number Field must be at least 5' }).nullable(),

  dataField: z.date(),
  switchField: z.boolean(),
  radioField: z.string().min(1, 'Please select an option'),
  checkboxField: z.string().array().min(1, 'Please select at least one option'),
});

export const Default: Story = {
  render: () => {
    const { TanStackContainerForm, TanStackSectionForm, TanStackTitleField, AppField } = useTanStackForm({
      defaultValues: {
        textField: '',
        textareaField: '',
        numberField: null,

        dataField: new Date(),
        switchField: false,
        radioField: '',
        checkboxField: [] as string[],
      } as z.output<typeof schema>,
    });
    return (
      <div className="size-full bg-muted-bg-subtle p-4">
        <TanStackContainerForm>
          <TanStackSectionForm title="Section Form Title">
            <TanStackTitleField title="Section Title" description="This is the description for the section title." />
            <AppField
              name="textField"
              children={({ TextField }) => {
                return (
                  <TextField
                    label="Text Field"
                    placeholder="Enter text here"
                    description="This is a text field."
                    helperText="You can enter up to 100 characters."
                    orientation="responsive"
                    showClearButton={true}
                    showErrorMessage={true}
                  />
                );
              }}
            />
            <AppField
              name="textField"
              children={({ TextField }) => {
                return (
                  <TextField
                    label="Text Field"
                    placeholder="Enter text here"
                    description="This is a text field."
                    orientation="responsive"
                    showClearButton={true}
                    showErrorMessage={true}
                  />
                );
              }}
            />
            <AppField
              name="textareaField"
              children={({ TextareaField }) => {
                return (
                  <TextareaField
                    label="Textarea Field"
                    placeholder="Enter text here"
                    description="This is a textarea field."
                    orientation="responsive"
                    showErrorMessage={true}
                  />
                );
              }}
            />
            <AppField
              name="numberField"
              children={({ NumberField }) => {
                return (
                  <NumberField
                    label="Number Field"
                    placeholder="Enter number here"
                    description="This is a number field."
                    orientation="responsive"
                    showErrorMessage={true}
                  />
                );
              }}
            />
          </TanStackSectionForm>
          <TanStackSectionForm title="Selection Fields">
            <TanStackTitleField title="Section Title" description="This is the description for the section title." />
            <AppField
              name="dataField"
              children={({ DateField }) => {
                return <DateField label="Date Field" placeholder="Select date" description="This is a date field." orientation="responsive" />;
              }}
            />
            <AppField
              name="switchField"
              children={({ SwitchField }) => {
                return <SwitchField label="Switch Field" description="This is a switch field." helperText="You can toggle this switch." />;
              }}
            />
            <AppField
              name="radioField"
              children={({ RadioGroupField }) => {
                return (
                  <RadioGroupField
                    label="Radio Group Field"
                    description="This is a radio group field."
                    options={[
                      { label: 'Option 1', value: 'option1', description: 'This is option 1' },
                      { label: 'Option 2', value: 'option2', description: 'This is option 2' },
                      { label: 'Option 3', value: 'option3', description: 'This is option 3' },
                    ]}
                    orientation="responsive"
                    helperText="Please select one of the options."
                  />
                );
              }}
            />
            <AppField
              name="checkboxField"
              children={({ CheckboxField }) => {
                return (
                  <CheckboxField
                    label="Checkbox Field"
                    description="This is a checkbox field."
                    options={[
                      { label: 'Option 1', value: 'option1' },
                      { label: 'Option 2', value: 'option2' },
                      { label: 'Option 3', value: 'option3' },
                    ]}
                    orientation="responsive"
                    helperText="Please select one or more of the options."
                  />
                );
              }}
            />
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const FormDialog: Story = {
  render: () => {
    const { AppForm, TanStackDialogForm, AppField } = useTanStackForm({
      defaultValues: {
        textField: '',
        textareaField: '',
      },
    });
    const [open, setOpen] = useState<boolean>(false);
    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open Form Dialog
        </Button>
        <AppForm>
          <TanStackDialogForm title="Form Dialog Title" width="100%" maxWidth="1200px" open={open} onOpenChange={setOpen}>
            <AppField
              name="textField"
              children={({ TextField }) => {
                return (
                  <TextField
                    label="Text Field"
                    placeholder="Enter text here"
                    description="This is a text field."
                    orientation="responsive"
                    showClearButton={true}
                    showErrorMessage={true}
                  />
                );
              }}
            />
            <AppField
              name="textareaField"
              children={({ TextareaField }) => {
                return (
                  <TextareaField
                    label="Textarea Field"
                    placeholder="Enter text here"
                    description="This is a textarea field."
                    orientation="responsive"
                    showErrorMessage={true}
                  />
                );
              }}
            />
          </TanStackDialogForm>
        </AppForm>
      </>
    );
  },
};

export const PopoverForm: Story = {
  render: () => {
    const { AppForm, AppField, TanStackPopoverForm } = useTanStackForm({
      defaultValues: {
        textField: '',
        textareaField: '',
      },
    });

    const [open, setOpen] = useState<boolean>(false);

    return (
      <AppForm>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open Popover Form
        </Button>
        <TanStackPopoverForm title="Popover Form Title" open={open} onOpenChange={setOpen}>
          <AppField
            name="textField"
            children={({ TextField }) => {
              return (
                <TextField
                  label="Text Field"
                  placeholder="Enter text here"
                  description="This is a text field."
                  orientation="responsive"
                  showClearButton={true}
                  showErrorMessage={true}
                />
              );
            }}
          />
          <AppField
            name="textareaField"
            children={({ TextareaField }) => {
              return (
                <TextareaField
                  label="Textarea Field"
                  placeholder="Enter text here"
                  description="This is a textarea field."
                  orientation="responsive"
                  showErrorMessage={true}
                />
              );
            }}
          />
        </TanStackPopoverForm>
      </AppForm>
    );
  },
};

export const SelectAndCombobox: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        country: null as string | null,
        language: null as string | null,
      },
    });
    return (
      <div className="size-full bg-muted-bg-subtle p-4">
        <TanStackContainerForm>
          <TanStackSectionForm title="Selection Fields">
            <AppField
              name="country"
              children={({ ComboboxField }) => (
                <ComboboxField
                  label="Country"
                  description="Search and select your country."
                  placeholder="Search country…"
                  orientation="responsive"
                  tooltip="Used to determine your regional settings and tax information."
                  options={[
                    { label: 'Australia', value: 'au' },
                    { label: 'Canada', value: 'ca' },
                    { label: 'France', value: 'fr' },
                    { label: 'Germany', value: 'de' },
                    { label: 'Japan', value: 'jp' },
                    { label: 'United Kingdom', value: 'gb' },
                    { label: 'United States', value: 'us' },
                    { label: 'Vietnam', value: 'vn' },
                  ]}
                />
              )}
            />
            <AppField
              name="language"
              children={({ SelectField }) => (
                <SelectField
                  label="Preferred Language"
                  description="Select the language for the interface."
                  placeholder="Choose a language"
                  orientation="responsive"
                  tooltip="Changing the language will update all UI text and date formats."
                  options={[
                    { label: 'English', value: 'en' },
                    { label: 'French', value: 'fr' },
                    { label: 'German', value: 'de' },
                    { label: 'Japanese', value: 'ja' },
                    { label: 'Portuguese', value: 'pt' },
                    { label: 'Spanish', value: 'es' },
                    { label: 'Vietnamese', value: 'vi' },
                  ]}
                />
              )}
            />
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const AllFieldsWithTooltips: Story = {
  render: () => {
    const schema = z.object({
      name: z.string().min(2, 'Name must be at least 2 characters').nullable(),
      email: z.string().email('Enter a valid email').nullable(),
      password: z.string().min(8, 'Minimum 8 characters').nullable(),
      bio: z.string().max(200, 'Max 200 characters').nullable(),
      age: z.number().min(18, 'Must be 18 or older').nullable(),
      country: z.string().nullable(),
      language: z.string().nullable(),
      birthdate: z.date().nullable(),
      notifications: z.boolean(),
      role: z.string().nullable(),
      permissions: z.string().array(),
    });

    const { AppField, AppForm, TanStackContainerForm, TanStackSectionForm, TanStackCardForm, TanStackActionsForm, TanStackTitleField } = useTanStackForm({
      defaultValues: {
        name: null,
        email: null,
        password: null,
        bio: null,
        age: null,
        country: null,
        language: null,
        birthdate: null,
        notifications: false,
        role: null,
        permissions: [] as string[],
      } as z.output<typeof schema>,
      validators: { onChange: schema },
      onSubmit: ({ value }) => {
        console.log('Submitted:', value);
      },
    });

    return (
      <div className="size-full bg-muted-bg-subtle p-4">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Account Information">
              <TanStackTitleField title="Personal Details" description="Fill in your personal information to complete your profile." />
              <AppField
                name="name"
                children={({ TextField }) => (
                  <TextField
                    label="Full Name"
                    placeholder="John Doe"
                    orientation="responsive"
                    required
                    showClearButton
                    showErrorMessage
                    tooltip="Enter your legal name as it appears on official documents."
                  />
                )}
              />
              <AppField
                name="email"
                children={({ EmailField }) => (
                  <EmailField
                    label="Email Address"
                    placeholder="you@example.com"
                    orientation="responsive"
                    required
                    showErrorMessage
                    tooltip="Used for login and account notifications. Cannot be changed after registration."
                  />
                )}
              />
              <AppField
                name="password"
                children={({ PasswordField }) => (
                  <PasswordField
                    label="Password"
                    placeholder="Create a strong password"
                    orientation="responsive"
                    showErrorMessage
                    helperText="Minimum 8 characters. Include uppercase, lowercase, and a number."
                    tooltip="Your password is hashed with bcrypt and never stored in plain text."
                  />
                )}
              />
              <AppField
                name="bio"
                children={({ TextareaField }) => (
                  <TextareaField
                    label="Bio"
                    placeholder="Tell us a little about yourself…"
                    orientation="responsive"
                    counter
                    maxLength={200}
                    showErrorMessage
                    tooltip="This will appear on your public profile page."
                  />
                )}
              />
              <AppField
                name="age"
                children={({ NumberField }) => (
                  <NumberField
                    label="Age"
                    placeholder="Enter your age"
                    orientation="responsive"
                    required
                    showErrorMessage
                    tooltip="You must be at least 18 years old to use this service."
                  />
                )}
              />
            </TanStackSectionForm>

            <TanStackSectionForm title="Regional Settings">
              <AppField
                name="country"
                children={({ ComboboxField }) => (
                  <ComboboxField
                    label="Country"
                    description="Your country of residence."
                    placeholder="Search country…"
                    orientation="responsive"
                    tooltip="Determines your tax region and available payment methods."
                    options={[
                      { label: 'Australia', value: 'au' },
                      { label: 'Canada', value: 'ca' },
                      { label: 'France', value: 'fr' },
                      { label: 'Germany', value: 'de' },
                      { label: 'Japan', value: 'jp' },
                      { label: 'United Kingdom', value: 'gb' },
                      { label: 'United States', value: 'us' },
                      { label: 'Vietnam', value: 'vn' },
                    ]}
                  />
                )}
              />
              <AppField
                name="language"
                children={({ SelectField }) => (
                  <SelectField
                    label="Preferred Language"
                    description="Interface language."
                    placeholder="Select language"
                    orientation="responsive"
                    tooltip="Affects date formats, number separators, and UI text."
                    options={[
                      { label: 'English', value: 'en' },
                      { label: 'French', value: 'fr' },
                      { label: 'German', value: 'de' },
                      { label: 'Japanese', value: 'ja' },
                      { label: 'Vietnamese', value: 'vi' },
                    ]}
                  />
                )}
              />
              <AppField
                name="birthdate"
                children={({ DateField }) => (
                  <DateField
                    label="Date of Birth"
                    placeholder="Select your birthdate"
                    orientation="responsive"
                    tooltip="Required for age verification. Not shown publicly."
                    maxDate={new Date()}
                  />
                )}
              />
            </TanStackSectionForm>

            <TanStackSectionForm title="Preferences">
              <AppField
                name="notifications"
                children={({ SwitchField }) => (
                  <SwitchField
                    label="Email Notifications"
                    description="Receive updates about your account activity."
                    helperText="You can update this preference at any time in your settings."
                  />
                )}
              />
              <AppField
                name="role"
                children={({ RadioGroupField }) => (
                  <RadioGroupField
                    label="Account Role"
                    description="Select the role that best describes your use case."
                    orientation="responsive"
                    tooltip="Your role determines which features and data you can access."
                    options={[
                      { label: 'Viewer', value: 'viewer', description: 'Read-only access to shared resources.' },
                      { label: 'Editor', value: 'editor', description: 'Create and edit content.' },
                      { label: 'Admin', value: 'admin', description: 'Full access including user management.' },
                    ]}
                  />
                )}
              />
              <AppField
                name="permissions"
                children={({ CheckboxField }) => (
                  <CheckboxField
                    label="Permissions"
                    description="Select the permissions to grant."
                    orientation="responsive"
                    tooltip="Permissions are applied immediately upon saving."
                    options={[
                      { label: 'Read data', value: 'read' },
                      { label: 'Write data', value: 'write' },
                      { label: 'Export reports', value: 'export' },
                      { label: 'Manage users', value: 'users' },
                    ]}
                  />
                )}
              />
            </TanStackSectionForm>

            <TanStackActionsForm type="create" />
          </TanStackContainerForm>
        </AppForm>
      </div>
    );
  },
};

export const CardForm: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, title: 'API Integration', description: 'Connect to the external payment API.' },
      { id: 2, title: 'User Management', description: 'Configure user roles and permissions.' },
    ]);

    return (
      <div className="size-full bg-muted-bg-subtle p-4 flex flex-col gap-4">
        {items.map(item => {
          const InnerCard = () => {
            const { AppForm, AppField, TanStackCardForm, TanStackActionSubmit } = useTanStackForm({
              defaultValues: { notes: '' },
            });
            return (
              <AppForm>
                <TanStackCardForm title={item.title} description={item.description} onDelete={() => setItems(prev => prev.filter(i => i.id !== item.id))}>
                  <AppField
                    name="notes"
                    children={({ TextareaField }) => <TextareaField label="Notes" placeholder="Add notes…" orientation="responsive" showErrorMessage />}
                  />
                  <div className="flex justify-end px-4">
                    <TanStackActionSubmit label="Save" />
                  </div>
                </TanStackCardForm>
              </AppForm>
            );
          };
          return <InnerCard key={item.id} />;
        })}
      </div>
    );
  },
};

export const SectionForm: Story = {
  render: () => {
    const { AppForm, AppField, TanStackContainerForm, TanStackSectionForm, TanStackTitleField, TanStackActionsForm } = useTanStackForm({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        department: '',
        role: null as string | null,
      },
      onSubmit: ({ value }) => {
        console.log('Submitted:', value);
      },
    });

    return (
      <div className="size-full bg-muted-bg-subtle p-4">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Personal Information">
              <TanStackTitleField title="Your Details" description="Fill in your personal information." />
              <AppField
                name="firstName"
                children={({ TextField }) => (
                  <TextField label="First Name" placeholder="John" orientation="responsive" showClearButton showErrorMessage required />
                )}
              />
              <AppField
                name="lastName"
                children={({ TextField }) => (
                  <TextField label="Last Name" placeholder="Doe" orientation="responsive" showClearButton showErrorMessage required />
                )}
              />
              <AppField
                name="email"
                children={({ EmailField }) => <EmailField label="Email" placeholder="john@example.com" orientation="responsive" showErrorMessage required />}
              />
            </TanStackSectionForm>

            <TanStackSectionForm title="Work Information">
              <AppField
                name="company"
                children={({ TextField }) => <TextField label="Company" placeholder="Acme Corp" orientation="responsive" showClearButton showErrorMessage />}
              />
              <AppField
                name="department"
                children={({ TextField }) => (
                  <TextField label="Department" placeholder="Engineering" orientation="responsive" showClearButton showErrorMessage />
                )}
              />
              <AppField
                name="role"
                children={({ SelectField }) => (
                  <SelectField
                    label="Role"
                    placeholder="Select a role"
                    orientation="responsive"
                    options={[
                      { label: 'Individual Contributor', value: 'ic' },
                      { label: 'Team Lead', value: 'lead' },
                      { label: 'Manager', value: 'manager' },
                      { label: 'Director', value: 'director' },
                    ]}
                  />
                )}
              />
            </TanStackSectionForm>

            <TanStackActionsForm type="create" />
          </TanStackContainerForm>
        </AppForm>
      </div>
    );
  },
};

export const AdminLoginForm: Story = {
  render: () => {
    const schema = z.object({
      email: email().nullable(),
      password: z
        .string({ message: 'Nhập mật khẩu của bạn' })
        .min(8, { message: 'Mật khẩu tối thiểu 8 ký tự' })
        .max(50, { message: 'Mật khẩu không quá 50 ký tự' })
        .nullable()
        .refine(value => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!-/:-@[-`{-~])\S+$/.test(value ?? ''), {
          message: 'Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt',
        }),
    });
    const { AppForm, AppField, TanStackCardForm, TanStackActionSubmit } = useTanStackForm({
      defaultValues: {
        email: null,
        password: null,
      } as z.output<typeof schema>,
      onSubmit: () => {},
      validators: {
        onChange: schema,
      },
    });
    return (
      <AppForm>
        <TanStackCardForm title="Login to your account" description="Enter your email and password to login to your account">
          <AppField
            name="email"
            children={({ EmailField }) => {
              return (
                <EmailField
                  label="Email"
                  description="We'll never share your email with anyone else."
                  placeholder="Enter your email"
                  orientation="responsive"
                />
              );
            }}
          />
          <AppField
            name="password"
            children={({ PasswordField }) => {
              return (
                <PasswordField
                  label="Password"
                  description="Must be at least 8 characters long and include uppercase, lowercase, number, and special character."
                  placeholder="Enter your password"
                  orientation="responsive"
                />
              );
            }}
          />
          <div className="flex justify-end px-4">
            <TanStackActionSubmit label="Login" />
          </div>
        </TanStackCardForm>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <a href="/" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </AppForm>
    );
  },
};
