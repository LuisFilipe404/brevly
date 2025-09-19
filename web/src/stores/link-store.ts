import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { v4 as uuidV4 } from 'uuid'
import CreateNewShortLink from '../http/link/create-new-short-link'
import toast from 'react-hot-toast'
import type { UseFormReset } from 'react-hook-form'
import ListAllLinks from '../http/link/list-all-links'

export type Link = {
  originalUrl: string
  id: string
  shortUrl: string
  accessCount: number
}

type LinkStore = {
  links: Map<string, Link>
  createNewShortLink: (
    originalUrl: string,
    customAlias: string,
    reset: UseFormReset<{
      originalUrl: string
      customAlias: string
    }>,
  ) => Promise<void>
  fetchLinks: () => void
  deleteLink: (id: string) => void
}

enableMapSet()

export const useLink = create<LinkStore>()(
  immer((set): LinkStore => {
    async function createNewShortLink(
      originalUrl: string,
      customAlias: string,
      reset: UseFormReset<{
        originalUrl: string
        customAlias: string
      }>,
    ) {
      const id = uuidV4()

      const newLink = {
        originalUrl,
        id,
        shortUrl: customAlias,
        accessCount: 0,
      }

      const response = await CreateNewShortLink(newLink)

      if (response.errorMessage) {
        toast.error(response.errorMessage)
        return
      }

      set((state) => {
        state.links = new Map([
          [id, newLink],
          ...Array.from(state.links.entries()),
        ])
      })

      reset()
    }

    async function fetchLinks() {
      const result = await ListAllLinks()

      if (result.errorMessage) {
        toast.error(result.errorMessage)
      }

      set((state) => {
        state.links = new Map(
          (result.links ?? []).map((link: Link) => [link.id, link]),
        )
      })
    }

    async function deleteLink(id: string) {
      set((state) => {
        state.links.delete(id)
      })
    }

    return {
      links: new Map(),
      createNewShortLink,
      fetchLinks,
      deleteLink,
    }
  }),
)
