import React from "react"
import { FormField } from "@sanity/base/components"
import { Box, Stack, Spinner, Text, TextInput } from "@sanity/ui"
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent"
import { useId } from "@reach/auto-id"

// https://www.sanity.io/docs/custom-input-widgets

const ghQuery = `
query GET_REPO_README_FROM_URL ($url: URI!) {
  resource(url: $url) {
    ... on Repository {
      nameWithOwner
      url
      updatedAt
      object(expression: "master:README.md") {
        ... on Blob {
          text
        }
      }
    }
  }
}
`

const RepoUrl = React.forwardRef(
  (
    {
      type, // Schema information
      value, // Current field value
      readOnly, // Boolean if field is not editable
      placeholder, // Placeholder text from the schema
      markers, // Markers including validation rules
      presence, // Presence information for collaborative avatars
      compareValue, // Value to check for "edited" functionality
      onFocus,
      onBlur,
      onChange,
    },
    ref
  ) => {
    const inputId = useId()

    const [queryRes, setQueryRes] = React.useState({})
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
      setLoading(true)
      fetch("https://api.github.com/graphql", {
        method: "POST",
        body: JSON.stringify({
          query: ghQuery,
          variables: {
            url: value,
          },
        }),
        headers: {
          "content-type": "application/json",
          authorization: "bearer " + process.env.SANITY_STUDIO_GITHUB_API_TOKEN,
        },
      })
        .then((r) => r.json())
        .then((r) => {
          setQueryRes(r.data?.resource)
          setLoading(false)
        })
        .catch((error) => {
          setQueryRes({ error })
        })
    }, [value])

    const handleChange = React.useCallback(
      (event) => {
        const inputValue = event.currentTarget.value
        // if the value exists, set the data, if not, unset the data
        onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
      },
      [onChange]
    )

    return (
      <FormField
        title={type.title} // Creates label from schema title
        description={type.description} // Creates description from schema
        compareValue={compareValue} // Handles "edited" status
        __unstable_markers={markers} // Handles all markers including validation
        __unstable_presence={presence} // Handles presence avatars
        inputId={inputId}
      >
        <Stack>
          <TextInput
            id={inputId}
            value={value} // Current field value
            readOnly={readOnly} // If "readOnly" is defined make this field read only
            placeholder={placeholder} // If placeholder is defined, display placeholder text
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            ref={ref}
          />
          <Box marginTop={3}>
            {loading ? (
              <Spinner size={1} muted />
            ) : !value ? null : queryRes ? (
              <Text size={1} muted>
                {!loading && queryRes && (
                  <span>
                    <a href={queryRes.url} target="_blank">
                      {queryRes.nameWithOwner || null}
                    </a>
                    {`— Refreshed at ${new Date(
                      queryRes.updatedAt
                    ).toLocaleString()}`}
                  </span>
                )}
              </Text>
            ) : (
              <Text size={1} muted>
                Cannot find repository. {JSON.stringify(queryRes)}
              </Text>
            )}
          </Box>
        </Stack>
      </FormField>
    )
  }
)

export default RepoUrl
