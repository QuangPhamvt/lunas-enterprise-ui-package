import { describe, expect, it } from 'vitest'
import { OrientationField, RoundingField, TextFieldDataType } from '../constants'
import { TanStackFormSectionSchema, TanStackFormTextFieldSchema } from '../index'

const validTextField = {
  id: 'field-1',
  type: 'text-field' as const,
  name: 'firstName',
  camelCaseName: 'firstName',
  label: 'First Name',
}

describe('TanStackFormTextFieldSchema', () => {
  it('parses a valid minimal text field', () => {
    expect(TanStackFormTextFieldSchema.safeParse(validTextField).success).toBe(true)
  })

  it('applies default orientation=responsive', () => {
    const result = TanStackFormTextFieldSchema.safeParse(validTextField)
    expect(result.success && result.data.orientation).toBe(OrientationField.RESPONSIVE)
  })

  it('applies default dataType=text', () => {
    const result = TanStackFormTextFieldSchema.safeParse(validTextField)
    expect(result.success && result.data.dataType).toBe(TextFieldDataType.TEXT)
  })

  it('rejects empty id', () => {
    expect(TanStackFormTextFieldSchema.safeParse({ ...validTextField, id: '' }).success).toBe(false)
  })

  it('rejects empty name', () => {
    expect(TanStackFormTextFieldSchema.safeParse({ ...validTextField, name: '' }).success).toBe(false)
  })

  it('rejects empty label', () => {
    expect(TanStackFormTextFieldSchema.safeParse({ ...validTextField, label: '' }).success).toBe(false)
  })

  it('rejects wrong type literal', () => {
    expect(TanStackFormTextFieldSchema.safeParse({ ...validTextField, type: 'email-field' }).success).toBe(false)
  })

  it('accepts optional rules.maxLength', () => {
    const result = TanStackFormTextFieldSchema.safeParse({
      ...validTextField,
      rules: { maxLength: 100 },
    })
    expect(result.success).toBe(true)
  })

  it('defaults visibilityConditions.show to true', () => {
    const result = TanStackFormTextFieldSchema.safeParse({
      ...validTextField,
      visibilityConditions: { when: 'otherField', is: 'active' },
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.visibilityConditions?.show).toBe(true)
    }
  })
})

describe('TanStackFormSectionSchema', () => {
  it('parses a section with one text field', () => {
    const result = TanStackFormSectionSchema.safeParse({
      name: 'Personal Info',
      fields: [validTextField],
    })
    expect(result.success).toBe(true)
  })

  it('parses a section with no fields', () => {
    expect(TanStackFormSectionSchema.safeParse({ name: 'Empty Section', fields: [] }).success).toBe(true)
  })

  it('rejects a section with empty name', () => {
    expect(TanStackFormSectionSchema.safeParse({ name: '', fields: [] }).success).toBe(false)
  })

  it('rejects fields with an unknown type', () => {
    const result = TanStackFormSectionSchema.safeParse({
      name: 'Test',
      fields: [{ id: 'x', type: 'unknown-field', name: 'x', camelCaseName: 'x', label: 'X' }],
    })
    expect(result.success).toBe(false)
  })
})

describe('Constants cardinality', () => {
  it('OrientationField has three members', () => {
    expect(Object.values(OrientationField)).toHaveLength(3)
  })

  it('RoundingField has four members', () => {
    expect(Object.values(RoundingField)).toHaveLength(4)
  })

  it('TextFieldDataType has four members', () => {
    expect(Object.values(TextFieldDataType)).toHaveLength(4)
  })
})
